import { useState } from 'react';
import { submitWaitlist } from '@/lib/api';
import type { WaitlistEntry } from '@/lib/api';

interface Props {
  interest?: WaitlistEntry['interest'];
}

export default function WaitlistForm({ interest = 'both' }: Props) {
  const [contactType, setContactType] = useState<'email' | 'whatsapp'>('email');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus('loading');
    try {
      await submitWaitlist({ contact: contact.trim(), contactType, interest });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <span className="text-[10px] font-body uppercase tracking-[0.2em] text-stone">You're on the list</span>
        <p className="font-display italic text-2xl text-cream">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4">
      {/* Contact type toggle */}
      <div className="flex gap-0 rounded overflow-hidden border border-stone/20 w-fit mx-auto">
        {(['email', 'whatsapp'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setContactType(type)}
            className={[
              'font-body text-[10px] uppercase tracking-[0.15em] px-5 py-2 transition-colors duration-150',
              contactType === type
                ? 'bg-ochre text-cream'
                : 'bg-transparent text-stone hover:text-cream',
            ].join(' ')}
          >
            {type === 'email' ? 'Email' : 'WhatsApp'}
          </button>
        ))}
      </div>

      {/* Input + submit */}
      <div className="flex gap-0 rounded overflow-hidden border border-stone/20 focus-within:border-ochre/60 transition-colors">
        <input
          type={contactType === 'email' ? 'email' : 'tel'}
          value={contact}
          onChange={e => setContact(e.target.value)}
          placeholder={contactType === 'email' ? 'your@email.com' : '+233 000 000 000'}
          required
          className="flex-1 bg-green-deep text-cream font-body text-sm px-4 py-3 placeholder:text-stone/40 outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-body text-[11px] uppercase tracking-[0.12em] bg-ochre text-cream px-5 py-3 hover:bg-ochre-light transition-colors duration-150 disabled:opacity-60"
        >
          {status === 'loading' ? '…' : 'Notify me'}
        </button>
      </div>

      {status === 'error' && (
        <p className="font-body text-[11px] text-red-400 text-center">
          Something went wrong — try WhatsApp instead.
        </p>
      )}

      <p className="font-body text-[10px] text-stone/50 text-center tracking-[0.05em]">
        No spam. One message when bookings open.
      </p>
    </form>
  );
}
