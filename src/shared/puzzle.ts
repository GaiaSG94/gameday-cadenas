export type Clue =
  | { kind: 'parity'; dial: number; even: boolean }
  | { kind: 'notValue'; dial: number; value: number }
  | { kind: 'sum'; a: number; b: number; total: number }
  | { kind: 'order'; greater: number; smaller: number }
  | { kind: 'first'; dial: number; value: number };

export type CadenasPuzzle = {
  day: string;
  dials: number;
  clues: Clue[];
  solution: number[];
};

export const DIALS = 4;
export const MAX_VALUE = 9;

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'cadenas:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const clueHolds = (clue: Clue, combo: number[]): boolean => {
  const at = (i: number): number => combo[i] ?? 0;
  switch (clue.kind) {
    case 'parity':
      return (at(clue.dial) % 2 === 0) === clue.even;
    case 'notValue':
      return at(clue.dial) !== clue.value;
    case 'sum':
      return at(clue.a) + at(clue.b) === clue.total;
    case 'order':
      return at(clue.greater) > at(clue.smaller);
    case 'first':
      return at(clue.dial) === clue.value;
  }
};

export const countSolutions = (clues: Clue[]): number => {
  let total = 0;
  for (let a = 0; a <= MAX_VALUE; a++) {
    for (let b = 0; b <= MAX_VALUE; b++) {
      for (let c = 0; c <= MAX_VALUE; c++) {
        for (let d = 0; d <= MAX_VALUE; d++) {
          const combo = [a, b, c, d];
          if (clues.every((clue) => clueHolds(clue, combo))) total++;
        }
      }
    }
  }
  return total;
};

const randomClue = (rand: () => number, solution: number[]): Clue => {
  const dial = Math.floor(rand() * DIALS);
  const other = Math.floor(rand() * DIALS);
  const kind = Math.floor(rand() * 5);
  const at = (i: number): number => solution[i] ?? 0;
  if (kind === 0) return { kind: 'parity', dial, even: at(dial) % 2 === 0 };
  if (kind === 1) return { kind: 'notValue', dial, value: (at(dial) + 1 + Math.floor(rand() * 9)) % 10 };
  if (kind === 2 && other !== dial) {
    return { kind: 'sum', a: dial, b: other, total: at(dial) + at(other) };
  }
  if (kind === 3 && other !== dial) {
    const greater = at(dial) > at(other) ? dial : other;
    const smaller = greater === dial ? other : dial;
    return { kind: 'order', greater, smaller };
  }
  return { kind: 'first', dial, value: at(dial) };
};

export const generateCadenas = (day: string): CadenasPuzzle => {
  const rand = mulberry32(dailySeed(day));
  const solution = Array.from({ length: DIALS }, () => Math.floor(rand() * (MAX_VALUE + 1)));
  const clues: Clue[] = [];
  for (let attempt = 0; attempt < 200; attempt++) {
    const candidate = randomClue(rand, solution);
    if (!clues.every((clue) => clueHolds(clue, solution))) continue;
    const withCandidate = [...clues, candidate];
    if (countSolutions(withCandidate) >= 1) {
      clues.push(candidate);
      if (countSolutions(clues) === 1) break;
    }
  }
  return { day, dials: DIALS, clues, solution };
};

export const isUnlocked = (puzzle: CadenasPuzzle, combo: number[]): boolean =>
  puzzle.clues.every((clue) => clueHolds(clue, combo));

export const clueText = (clue: Clue): string => {
  const label = (i: number): string => `dial ${i + 1}`;
  switch (clue.kind) {
    case 'parity':
      return `${label(clue.dial)} is ${clue.even ? 'even' : 'odd'}`;
    case 'notValue':
      return `${label(clue.dial)} is not ${clue.value}`;
    case 'sum':
      return `${label(clue.a)} + ${label(clue.b)} = ${clue.total}`;
    case 'order':
      return `${label(clue.greater)} is higher than ${label(clue.smaller)}`;
    case 'first':
      return `${label(clue.dial)} shows ${clue.value}`;
  }
};
