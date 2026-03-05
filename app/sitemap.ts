import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import { getAllStorySlugs } from '@/lib/stories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aifornewyork.org';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/stories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/take-action`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/press`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  // Bill pages
  await dbConnect();
  const bills = await Bill.find({}).select('slug updated_at').lean();
  const billPages = bills.map((bill) => ({
    url: `${baseUrl}/legislation/${bill.slug}`,
    lastModified: new Date(bill.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Sign pages
  const signPages = bills.map((bill) => ({
    url: `${baseUrl}/sign/${bill.slug}`,
    lastModified: new Date(bill.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Story pages
  const storySlugs = getAllStorySlugs();
  const storyPages = storySlugs.map((slug) => ({
    url: `${baseUrl}/stories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...billPages, ...signPages, ...storyPages];
}
