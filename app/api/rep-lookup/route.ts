import { NextRequest, NextResponse } from 'next/server';
import { buildDistrictInfo } from '@/lib/zip-lookup';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import RepContact from '@/models/RepContact';

// US Census Bureau geocoder — free, no API key required
const CENSUS_GEOCODER_URL = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress';

interface CensusGeography {
  BASENAME: string;
  NAME: string;
  GEOID: string;
  SLDU?: string;
  SLDL?: string;
}

interface CensusMatch {
  matchedAddress: string;
  coordinates: { x: number; y: number };
  geographies: Record<string, CensusGeography[]>;
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');

  if (!address || address.trim().length < 5) {
    return NextResponse.json(
      { error: 'Please enter a valid New York address.' },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      address: address.trim(),
      benchmark: 'Public_AR_Current',
      vintage: 'Current_Current',
      format: 'json',
    });

    const res = await fetch(`${CENSUS_GEOCODER_URL}?${params}`, {
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Address lookup service is temporarily unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const matches: CensusMatch[] = data?.result?.addressMatches;

    if (!matches || matches.length === 0) {
      return NextResponse.json(
        { error: 'Could not find that address. Please enter a full New York street address (e.g., "280 Madison Ave, New York, NY 10016").' },
        { status: 404 }
      );
    }

    const match = matches[0];
    const geos = match.geographies;

    // Extract state legislative districts
    let senateDistrict: string | null = null;
    let assemblyDistrict: string | null = null;

    for (const [key, values] of Object.entries(geos)) {
      if (key.includes('Legislative Districts - Upper') && values.length > 0) {
        senateDistrict = values[0].BASENAME;
      }
      if (key.includes('Legislative Districts - Lower') && values.length > 0) {
        assemblyDistrict = values[0].BASENAME;
      }
    }

    if (!senateDistrict || !assemblyDistrict) {
      // Check if address is in New York State
      const stateGeo = geos['States'];
      if (!stateGeo || stateGeo[0]?.BASENAME !== 'New York') {
        return NextResponse.json(
          { error: 'That address does not appear to be in New York State.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Could not determine legislative districts for that address. Please try a more specific address.' },
        { status: 404 }
      );
    }

    const district = buildDistrictInfo(senateDistrict, assemblyDistrict);

    if (!district) {
      return NextResponse.json(
        { error: 'Found your districts but could not match to current representatives. District data may need updating.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...district,
      matched_address: match.matchedAddress,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: 'Address lookup timed out. Please try again.' },
        { status: 504 }
      );
    }
    console.error('Rep lookup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, action_type, district_type, district_number } = body;

    if (!address || !action_type) {
      return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
    }

    await dbConnect();

    const bill = await Bill.findOne({ slug: 's7263-ai-chatbot-professional-advice-ban' });
    if (!bill) {
      return NextResponse.json({ error: 'Bill not found.' }, { status: 404 });
    }

    await RepContact.create({
      bill_id: bill._id,
      zip_code: address,
      district_type: district_type || 'senate',
      district_number: district_number || 'unknown',
      action_type,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rep contact tracking error:', error);
    return NextResponse.json({ error: 'Failed to track action.' }, { status: 500 });
  }
}
