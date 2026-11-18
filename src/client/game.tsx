import './index.css';

import { useCallback, useEffect, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { clueText } from '../shared/puzzle';

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  dials: number;
  clues: { kind: string }[];
};

type Result = { won: boolean; streak: number; elapsedMs: number };

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [combo, setCombo] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setCombo(Array.from({ length: data.dials }, () => 0));
      setResult(null);
      setSeconds(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const step = (i: number, delta: number) => {
    setCombo((current) =>
      current.map((v, idx) => (idx === i ? (v + delta + 10) % 10 : v))
    );
  };

  const submit = async () => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo, startedAt: Date.now() - seconds * 1000 }),
      });
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'submit failed');
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#231a10] text-[#e8d9bd]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#231a10] text-[#a08b63]">
        <p className="animate-pulse">Oiling the locks…</p>
      </div>
    );
  }

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#231a10] px-4 py-6 text-[#e8d9bd]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#c9a25e]">CADENAS</h1>
        <div className="text-sm font-semibold text-[#a08b63]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#a08b63]">
        Set the four dials so every clue on the tag is true, then open today's lock.
      </p>
      <div className="flex gap-3 rounded-2xl border-2 border-[#3a2c19] bg-[#2c2114] p-4 shadow-[inset_0_2px_12px_#1a130a]">
        {combo.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <button
              onClick={() => step(i, 1)}
              className="rounded-t-md border-2 border-[#3a2c19] bg-[#1a130a] px-3 text-xs font-bold text-[#c9a25e]"
              aria-label={`dial ${i + 1} up`}
            >
              ▲
            </button>
            <div className="flex h-16 w-12 items-center justify-center border-x-2 border-[#3a2c19] bg-[#1a130a] text-3xl font-black tabular-nums text-[#e8d9bd]">
              {value}
            </div>
            <button
              onClick={() => step(i, -1)}
              className="rounded-b-md border-2 border-[#3a2c19] bg-[#1a130a] px-3 text-xs font-bold text-[#c9a25e]"
              aria-label={`dial ${i + 1} down`}
            >
              ▼
            </button>
          </div>
        ))}
      </div>
      <ul className="w-full max-w-md space-y-1.5 rounded-xl border-2 border-[#3a2c19] bg-[#2c2114] p-4 text-[13px] text-[#e8d9bd]">
        {init.clues.map((clue, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a25e]" />
            {clueText(clue as never)}
          </li>
        ))}
      </ul>
      {!result ? (
        <button
          onClick={() => void submit()}
          className="w-full max-w-md rounded-full bg-[#c9a25e] py-3 text-base font-black uppercase tracking-widest text-[#231a10] transition-transform active:scale-[0.98]"
        >
          Open
        </button>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#3a2c19] bg-[#2c2114] p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'CLICK — OPEN' : 'STILL LOCKED'}
          </p>
          <p className="text-sm text-[#a08b63]">
            {result.won
              ? `Opened in ${clock} — streak 🔥 ${result.streak}. Come back tomorrow for a new lock.`
              : 'At least one clue is broken. Adjust the dials and try again.'}
          </p>
          <button
            onClick={() => setResult(null)}
            className="rounded-full border-2 border-[#c9a25e] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#c9a25e]"
          >
            Back to the lock
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
