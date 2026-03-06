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
    <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 bg-[rgba(250,248,245,0.85)] backdrop-blur-[20px] border-b border-border transition-all duration-300">
      <Link href="/" className="font-body font-bold text-[15px] tracking-tight text-text flex items-center gap-2">
        <img src="/logo.png" alt="AI for New York" className="w-8 h-8 rounded-full" />
        <span><span className="text-navy font-bold">AI</span> for New York</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-9">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-body font-medium text-text-body hover:text-navy transition-colors tracking-[0.01em]"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/sign/s7263-ai-chatbot-professional-advice-ban"
          className="bg-navy text-white px-6 py-2.5 rounded-full text-[13px] font-body font-semibold tracking-[0.02em] hover:bg-blue-dark hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(26,62,255,0.3)] transition-all"
        >
          Sign the Letter
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-text"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[rgba(250,248,245,0.95)] backdrop-blur-[20px] border-b border-border md:hidden px-6 pb-6 pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-body font-medium text-text-body hover:text-navy"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sign/s7263-ai-chatbot-professional-advice-ban"
            className="block mt-3 bg-navy text-white px-6 py-2.5 rounded-full text-sm font-body font-semibold text-center hover:bg-blue-dark"
            onClick={() => setIsOpen(false)}
          >
            Sign the Letter
          </Link>
        </div>
      )}
    </nav>
  );
}
