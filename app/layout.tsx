import type { Metadata } from 'next';
import { DM_Serif_Display, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
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
    images: [
      {
        url: 'https://aifornewyork.org/logo.png',
        alt: 'AI For New York',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aifornewyork',
    title: 'AI For New York',
    description: 'A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.',
    images: ['https://aifornewyork.org/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
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
