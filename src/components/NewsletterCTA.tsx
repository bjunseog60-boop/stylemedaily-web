'use client';
import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const form = document.createElement('form');
    form.action = 'https://github.us19.list-manage.com/subscribe/post?u=db90d7adcb0b1095c2da145c5&id=f782ed54bf&f_id=00328fe3f0';
    form.method = 'POST';
    form.target = 'mc-hidden-frame';

    const emailInput = document.createElement('input');
    emailInput.name = 'EMAIL';
    emailInput.value = email;
    form.appendChild(emailInput);

    const botField = document.createElement('input');
    botField.name = 'b_db90d7adcb0b1095c2da145c5_f782ed54bf';
    botField.value = '';
    form.appendChild(botField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setDone(true);
  };

  return (
    <div className="card p-8 text-center bg-gradient-to-br from-blush-50 to-purple-50/30 border-blush-200/40">
      <iframe name="mc-hidden-frame" style={{ display: 'none' }} tabIndex={-1}></iframe>

      {done ? (
        <div className="animate-fade-in">
          <div className="text-4xl mb-3">💌</div>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Welcome to the club!</h3>
          <p className="text-gray-500">Check your inbox to confirm your subscription.</p>
        </div>
      ) : (
        <>
          <div className="text-3xl mb-3">💌</div>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Weekly Style Drop</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Outfit ideas, trend alerts, and exclusive deals delivered every Thursday. Join 25,000+ stylish women.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white border border-blush-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100"
            />
            <button type="submit" className="btn-primary text-sm !px-5 !py-2.5 whitespace-nowrap">Subscribe Free</button>
          </form>
          <p className="text-[11px] t
