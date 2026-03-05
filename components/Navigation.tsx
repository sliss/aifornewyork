'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/legislation/s7263-ai-chatbot-professional-advice-ban', label: 'The Bill' },
    { href: '/stories', label: 'Stories' },
    { href: '/take-action', label: 'Take Action' },
    { href: '/about', label: 'About' },
    { href: '/press', label: 'Press' },
  ];

  return (
    <nav className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">
            AI For New York
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-ui text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign/s7263-ai-chatbot-professional-advice-ban"
              className="bg-amber text-white px-4 py-2 rounded-md text-sm font-ui font-semibold hover:bg-amber-light transition-colors"
            >
              Sign the Letter
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-navy-light">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-ui text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign/s7263-ai-chatbot-professional-advice-ban"
              className="block mt-2 bg-amber text-white px-4 py-2 rounded-md text-sm font-ui font-semibold text-center hover:bg-amber-light"
              onClick={() => setIsOpen(false)}
            >
              Sign the Letter
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
