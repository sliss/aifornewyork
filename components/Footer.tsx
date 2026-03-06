import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-body font-bold text-[15px] text-text mb-3 flex items-center gap-2">
              <span className="text-navy text-lg font-bold">AI</span> for New York
            </h3>
            <p className="text-sm text-text-light leading-relaxed">
              A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-medium text-muted uppercase tracking-[0.08em] mb-3">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legislation/s7263-ai-chatbot-professional-advice-ban" className="text-text-light hover:text-navy transition-colors">Legislation Tracker</Link></li>
              <li><Link href="/stories" className="text-text-light hover:text-navy transition-colors">Stories</Link></li>
              <li><Link href="/take-action" className="text-text-light hover:text-navy transition-colors">Take Action</Link></li>
              <li><Link href="/about" className="text-text-light hover:text-navy transition-colors">About</Link></li>
              <li><Link href="/press" className="text-text-light hover:text-navy transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-medium text-muted uppercase tracking-[0.08em] mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:aifornewyork@gmail.com" className="text-text-light hover:text-navy transition-colors">
                  aifornewyork@gmail.com
                </a>
              </li>
              <li>
                <a href="https://x.com/aifornewyork" target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-navy transition-colors">
                  @aifornewyork
                </a>
              </li>
              <li><Link href="/privacy" className="text-text-light hover:text-navy transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-xs text-muted">
          <p>
            AI For New York is an independent advocacy organization. The information on this site is for educational and advocacy purposes and does not constitute legal advice.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} AI For New York. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
