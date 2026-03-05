import type { Metadata } from 'next';
import { DM_Serif_Display, Source_Sans_3, DM_Sans } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-playfair',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI For New York — Protecting New Yorkers\' Right to AI-Powered Information',
    template: '%s | AI For New York',
  },
  description: 'A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aifornewyork.org',
    siteName: 'AI For New York',
    title: 'AI For New York — Protecting New Yorkers\' Right to AI-Powered Information',
    description: 'A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aifornewyork',
    title: 'AI For New York',
    description: 'A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${sourceSans.variable} ${dmSans.variable}`}>
      <head>
        {process.env.PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
