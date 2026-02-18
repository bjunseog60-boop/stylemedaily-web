'use client';
import { useState, useEffect, useRef } from 'react';

const POPUP_KEY = 'smd_popup_shown';
const SHOW_DELAY_MS = 30000; // 30 seconds

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Don't show if already seen this session
    if (sessionStorage.getItem(POPUP_KEY)) return;

    // Show after delay
    timer.current = setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);

    // Also show on exit intent (mouse leaving viewport upward)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !sessionStorage.getItem(POPUP_KEY)) {
        if (timer.current) clearTimeout(timer.current);
        setVisible(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(POPUP_KEY, '1');
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-fade-in text-center">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
        >
          ✕
        </button>

        <span className="text-3xl block mb-3">✨</span>
        <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
          Get the Weekly Style Edit
        </h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Outfit ideas, trend reports, and curated Amazon finds — delivered every Thursday.
          <strong className="block text-gray-600 mt-1">Join 12,000+ readers.</strong>
        </p>

        {done ? (
          <div className="animate-fade-in">
            <p className="text-green-600 font-semibold text-sm">🎉 You&apos;re in! Check your inbox.</p>
          </div>
        ) : (
          <>
            <iframe name="mc-popup-frame" style={{ display: 'none' }} tabIndex={-1} />
            <form
              action="https://github.us19.list-manage.com/subscribe/post?u=db90d7adcb0b1095c2da145c5&amp;id=f782ed54bf&amp;f_id=00328fe3f0"
              method="post"
              target="mc-popup-frame"
              onSubmit={() => setTimeout(() => { setDone(true); sessionStorage.setItem(POPUP_KEY, '1'); }, 500)}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                name="EMAIL"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
              />
              <input type="hidden" name="b_db90d7adcb0b1095c2da145c5_f782ed54bf" value="" />
              <button type="submit" className="btn-primary w-full py-3 text-sm font-semibold">
                Yes, Send Me Style Tips!
              </button>
            </form>
            <button
              onClick={dismiss}
              className="text-[11px] text-gray-400 mt-3 hover:text-gray-600 transition-colors underline"
            >
              No thanks, I&apos;m happy with my current style
            </button>
          </>
        )}
      </div>
    </div>
  );
}
