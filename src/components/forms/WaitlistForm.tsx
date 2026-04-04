import { useState } from 'react';
import { submitWaitlist } from '@/lib/api';
import type { WaitlistEntry } from '@/lib/api';

interface Props {
  interest: WaitlistEntry['interest'];
  darkMode?: boolean;
}

type ContactType = 'whatsapp' | 'email';
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function WaitlistForm({ interest, darkMode = false }: Props) {
  const [contactType, setContactType] = useState<ContactType>('whatsapp');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // Palette variants
  const inputBg      = darkMode ? 'bg-transparent'        : 'bg-cream';
  const inputText    = darkMode ? 'text-cream'             : 'text-bark';
  const inputBorder  = darkMode ? 'border-stone/30'        : 'border-stone/40';
  const inputFocus   = darkMode ? 'focus:border-ochre/70'  : 'focus:border-ochre';
  const placeholder  = darkMode ? 'placeholder:text-stone/40' : 'placeholder:text-stone/50';
  const toggleBorder = darkMode ? 'border-stone/30'        : 'border-stone/30';
  const toggleInactive = darkMode ? 'text-stone/60 hover:text-stone' : 'text-muted hover:text-bark';
  const noteText     = darkMode ? 'text-stone/40'          : 'text-muted/60';

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
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <span className={`font-body text-[10px] uppercase tracking-[0.2em] ${darkMode ? 'text-stone/60' : 'text-muted'}`}>
          You're on the list
        </span>
        <p className={`font-display italic text-[22px] leading-snug ${darkMode ? 'text-cream' : 'text-bark'}`}>
          Perfect — we'll let you know the moment bookings open.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4">

      {/* Toggle: WhatsApp | Email */}
      <div className={`flex w-fit mx-auto border rounded-sm overflow-hidden ${toggleBorder}`}>
        {(['whatsapp', 'email'] as ContactType[]).map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setContactType(type)}
            className={[
              'font-body text-[10px] uppercase tracking-[0.14em] px-5 py-2 transition-colors duration-150',
              contactType === type
                ? 'bg-ochre text-cream'
                : `bg-transparent ${toggleInactive}`,
            ].join(' ')}
          >
            {type === 'whatsapp' ? 'WhatsApp' : 'Email'}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className={`flex overflow-hidden border rounded-sm transition-colors duration-150 focus-within:border-ochre/60 ${inputBorder}`}>
        <input
          type={contactType === 'email' ? 'email' : 'tel'}
          value={contact}
          onChange={e => setContact(e.target.value)}
          placeholder={contactType === 'whatsapp' ? '+233 000 000 000' : 'your@email.com'}
          required
          className={[
            'flex-1 font-body text-sm px-4 py-3 outline-none',
            inputBg, inputText, inputFocus, placeholder,
          ].join(' ')}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={[
            'font-body text-[11px] uppercase tracking-[0.12em] px-5 py-3 transition-colors duration-150 shrink-0 disabled:opacity-60',
            darkMode
              ? 'bg-cream text-ochre hover:bg-stone'
              : 'bg-ochre text-cream hover:bg-ochre-light',
          ].join(' ')}
        >
          {status === 'loading' ? '…' : 'Notify me'}
        </button>
      </div>

      {status === 'error' && (
        <p className="font-body text-[11px] text-red-400 text-center">
          Something went wrong — try WhatsApp instead.
        </p>
      )}

      <p className={`font-body text-[10px] text-center tracking-[0.05em] ${noteText}`}>
        No spam. One message when bookings open.
      </p>

    </form>
  );
}
