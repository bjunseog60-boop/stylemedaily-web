'use client';
import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl p-8 text-center bg-white">
      <iframe name="mc-hidden-frame" style={{ display: 'none' }} tabIndex={-1}></iframe>

      {done ? (
        <div className="animate-fade-in">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Welcome to the club</h3>
          <p className="text-gray-400">Check your inbox to confirm your subscription.</p>
        </div>
      ) : (
        <>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">The Weekly Style Edit</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Outfit ideas, trend analysis, and curated picks delivered every Thursday.
          </p>
          <form
            action="https://github.us19.list-manage.com/subscribe/post?u=db90d7adcb0b1095c2da145c5&amp;id=f782ed54bf&amp;f_id=00328fe3f0"
            method="post"
            target="mc-hidden-frame"
            onSubmit={() => setTimeout(() => setDone(true), 500)}
            className="flex gap-2 max-w-sm mx-auto"
          >
            <input
              type="email"
              name="EMAIL"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
            <input type="hidden" name="b_db90d7adcb0b1095c2da145c5_f782ed54bf" value="" />
            <button type="submit" className="btn-primary text-sm !px-5 !py-2.5 whitespace-nowrap">Subscribe</button>
          </form>
          <p className="text-[11px] text-gray-400 mt-3">
            No spam. Unsubscribe anytime. See our{' '}
            <a href="/privacy" className="underline hover:text-gray-600 transition-colors">Privacy Policy</a>.
          </p>
        </>
      )}
    </div>
  );
}
