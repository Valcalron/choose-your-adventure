# Choose Your Adventure

A mobile-friendly branching narrative roleplaying game starter built with React, TypeScript, Vite, and Supabase.

## Included

- Human or Cybertronian origin selection
- Human male/female and Cybertronian mech/femme choices
- Human appearance fields
- G1-style Cybertronian frame appearance fields
- Cybertronian alternate-mode categories and specific forms
- Human 1984 opening
- Cybertronian early-war opening
- Branching story engine
- Hidden faction, personality, flag, relationship, and inventory state
- Local save support
- Optional Supabase cloud-save support
- Supabase SQL schema with row-level security
- Responsive phone layout

## Start Locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Enter your Supabase URL and anon key.
4. Install and run:

```bash
npm install
npm run dev
```

The app still runs without Supabase credentials. In that mode, it uses local browser storage.

## Set Up Supabase

Open the Supabase SQL Editor and run:

```text
supabase/migrations/001_initial_schema.sql
```

You can then run `supabase/seed.sql`, though the current prototype story is bundled locally in `src/data/story.ts`.

## Next Recommended Features

1. Supabase authentication screen
2. Multiple save slots
3. Story scenes loaded from Supabase instead of the local file
4. Writer/admin scene editor
5. Conditional appearance references in dialogue
6. Persistent Prizm and Juci companion relationships
7. Faction membership progression
8. Human conversion route
9. Portrait and background storage
10. Capacitor packaging for Android and iOS

## Story Data Shape

Each scene has:

- `id`
- `origin`
- `chapter`
- `title`
- `speaker`
- `body`
- `choices`
- `isEnding`

Each choice has:

- `id`
- `label`
- `nextSceneId`
- `requirements`
- `effects`

The engine supports:

- Origin requirements
- Sex/designation requirements
- Flags
- Faction values
- Personality values
- Relationships
- Inventory

## Publish with GitHub Pages

The included `.github/workflows/deploy.yml` builds and publishes the app whenever `main` is updated.

In the GitHub repository:

1. Open **Settings → Secrets and variables → Actions**.
2. Add `VITE_SUPABASE_URL`.
3. Add `VITE_SUPABASE_ANON_KEY`.
4. Open **Settings → Pages**.
5. Set the source to **GitHub Actions**.
6. Push to `main`.

Do not place the Supabase service-role key in the app or GitHub Pages secrets. The browser app uses only the public anon key together with row-level security.
