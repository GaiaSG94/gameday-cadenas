# Cadenas

A daily deduction game for Reddit, built on [Devvit Web](https://developers.reddit.com/).

Every day a brass lock arrives with four dials (0-9) and a tag of clues:

- *dial 2 is even*
- *dial 1 + dial 4 = 11*
- *dial 3 is higher than dial 2*

Set the dials so that **every clue is true**, then open the lock. The clue set
is generated so the combination is unique.

## How to play

1. Tap ▲ / ▼ to set each dial.
2. Read the tag: each line is a constraint on the dials.
3. Tap **Open** when every clue holds. A correct combination opens the lock
   and extends your streak.

One lock per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post)
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily generation (UTC seed), uniqueness brute-force checked,
  unit-tested

## Development

```bash
npm install
npm run dev        # playtest on Reddit
npm test           # unit tests
npm run type-check # types + lint
npm run build
```

## Submission (Reddit's Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-cadenas` (private until judging ends)
- Demo post: public test subreddit, post running the game
