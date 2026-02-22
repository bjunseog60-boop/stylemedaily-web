import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-noir-950 mt-20">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-xl font-light text-white tracking-editorial">
              STYLE<span className="text-gold-400">ME</span>DAILY
            </span>
            <p className="text-sm text-noir-500 leading-relaxed mt-4">Expert styling guides and curated fashion advice for the modern woman.</p>
            <a href="mailto:yss007895@gmail.com" className="inline-block mt-3 text-xs text-noir-500 hover:text-gold-400 transition-colors tracking-wide">
              yss007895@gmail.com
            </a>
          </div>
          <div>
            <h4 className="text-[10px] font-medium text-gold-400 tracking-ultra-wide uppercase mb-4">Explore</h4>
            <div className="space-y-2.5">
              <Link href="/shop" className="block text-sm text-noir-400 hover:text-white transition-colors">Shop All Items</Link>
              <Link href="/guides" className="block text-sm text-noir-400 hover:text-white transition-colors">Style Guides</Link>
              <Link href="/blog" className="block text-sm text-noir-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/style-quiz" className="block text-sm text-noir-400 hover:text-white transition-colors">Style Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-medium text-gold-400 tracking-ultra-wide uppercase mb-4">Popular</h4>
            <div className="space-y-2.5">
              <Link href="/guides/capsule-wardrobe-working-women-2026" className="block text-sm text-noir-400 hover:text-white transition-colors">Capsule Wardrobe</Link>
              <Link href="/guides/dress-for-body-shape-guide" className="block text-sm text-noir-400 hover:text-white transition-colors">Body Shape Guide</Link>
              <Link href="/compare/nordstrom-vs-asos" className="block text-sm text-noir-400 hover:text-white transition-colors">Nordstrom vs ASOS</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-medium text-gold-400 tracking-ultra-wide uppercase mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-noir-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block text-sm text-noir-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="block text-sm text-noir-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-noir-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="block text-sm text-noir-400 hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-10 p-5 bg-noir-900 border border-noir-800">
          <p className="text-[11px] text-noir-500 leading-relaxed">
            <span className="text-gold-400/80 font-medium tracking-wide uppercase text-[10px]">Affiliate Disclosure</span> &mdash; StyleMeDaily is a participant in the Amazon Services LLC Associates Program and other affiliate programs. Some links on this site are affiliate links, meaning we may earn a small commission at no extra cost to you when you make a purchase through our links.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-noir-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-noir-600 tracking-wide">&copy; {new Date().getFullYear()} StyleMeDaily. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-noir-500 hover:text-gold-400 transition-colors tracking-wide uppercase">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-noir-500 hover:text-gold-400 transition-colors tracking-wide uppercase">Terms</Link>
            <Link href="/disclaimer" className="text-[11px] text-noir-500 hover:text-gold-400 transition-colors tracking-wide uppercase">Disclaimer</Link>
            <Link href="/about" className="text-[11px] text-noir-500 hover:text-gold-400 transition-colors tracking-wide uppercase">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
