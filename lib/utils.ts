export function isValidNYZip(zip: string): boolean {
  const zipNum = parseInt(zip, 10);
  if (isNaN(zipNum)) return false;
  // NY ZIP codes range roughly from 10001 to 14975
  return zipNum >= 10001 && zipNum <= 14975;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const STATUS_STEPS = [
  'introduced',
  'committee',
  'floor_vote',
  'passed_one_chamber',
  'passed_both',
  'signed',
] as const;

export const STATUS_LABELS: Record<string, string> = {
  introduced: 'Introduced',
  committee: 'In Committee',
  floor_vote: 'Floor Vote',
  passed_one_chamber: 'Passed One Chamber',
  passed_both: 'Passed Both',
  signed: 'Signed into Law',
  vetoed: 'Vetoed',
  dead: 'Dead',
};

export const THREAT_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  dangerous: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dangerous' },
  watch: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Watch' },
  supportive: { bg: 'bg-green-100', text: 'text-green-800', label: 'Supportive' },
};
