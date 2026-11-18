import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#231a10] px-6 text-center text-[#e8d9bd]">
      <div className="flex h-14 w-10 items-center justify-center rounded-md border-2 border-[#c9a25e] bg-[#1a130a] text-2xl font-black text-[#c9a25e]">
        ?
      </div>
      <h1 className="text-3xl font-black tracking-[0.3em] text-[#c9a25e]">CADENAS</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#a08b63]">
        One brass lock, four dials, clues on the tag. Hi {context.username ?? 'locksmith'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#c9a25e] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-[#231a10] transition-transform active:scale-[0.98]"
      >
        Pick it
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
