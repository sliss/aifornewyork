import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-surface text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-3">AI For New York</h3>
            <p className="text-sm leading-relaxed">
              A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.
            </p>
          </div>
          <div>
            <h4 className="font-ui text-sm font-semibold text-white mb-3 uppercase tracking-wide">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legislation/s7263-ai-chatbot-professional-advice-ban" className="hover:text-white transition-colors">Legislation Tracker</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Stories</Link></li>
              <li><Link href="/take-action" className="hover:text-white transition-colors">Take Action</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-ui text-sm font-semibold text-white mb-3 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:aifornewyork@gmail.com" className="hover:text-white transition-colors">
                  aifornewyork@gmail.com
                </a>
              </li>
              <li>
                <a href="https://x.com/aifornewyork" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @aifornewyork
                </a>
              </li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-xs text-gray-500">
          <p>
            AI For New York is an independent advocacy organization. The information on this site is for educational and advocacy purposes and does not constitute legal advice.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} AI For New York. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
