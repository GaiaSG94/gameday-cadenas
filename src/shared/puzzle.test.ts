import assert from 'node:assert/strict';
import { test } from 'node:test';

import { countSolutions, dailySeed, generateCadenas, isUnlocked } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
  assert.notEqual(dailySeed('2026-12-01'), dailySeed('2026-12-02'));
});

test('la serrure du jour est unique et deterministe', () => {
  const a = generateCadenas('2026-12-01');
  const b = generateCadenas('2026-12-01');
  assert.deepEqual(a.solution, b.solution);
  assert.deepEqual(a.clues, b.clues);
  assert.equal(countSolutions(a.clues), 1);
});

test('la solution verifie toutes les contraintes', () => {
  for (const day of ['2026-12-01', '2026-12-05', '2026-12-09']) {
    const puzzle = generateCadenas(day);
    assert.ok(isUnlocked(puzzle, puzzle.solution), day);
    assert.equal(countSolutions(puzzle.clues), 1, day);
  }
});

test('une mauvaise combinaison reste verrouillee', () => {
  const puzzle = generateCadenas('2026-12-01');
  const wrong = puzzle.solution.map((v, i) => (i === 0 ? (v + 1) % 10 : v));
  assert.equal(isUnlocked(puzzle, wrong), false);
});
