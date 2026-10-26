# GapFinder AI — beginner starter

This is a Next.js App Router + TypeScript starter for the GapFinder AI project. It includes a landing page, demo dashboard, upload UI, sample diagnostic quiz, sample revision plan, health endpoint, and an initial Supabase schema.

**Important:** The visible pages currently use demo data. File processing, authenticated accounts, RAG retrieval, AI question generation, database writes, and production authorization must be connected before presenting this as a completed AI system or using real student documents.

## 1. Install tools

1. Install Node.js LTS from https://nodejs.org/.
2. Install Visual Studio Code from https://code.visualstudio.com/.
3. Extract this folder, then open it in VS Code.

## 2. Run locally

Open Terminal in VS Code (Terminal > New Terminal) and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser. Stop the server with Ctrl+C.

## 3. Pages

- `/` landing page
- `/dashboard` sample topic mastery and gap report
- `/upload` upload UI prototype
- `/quiz` sample quiz with feedback
- `/report` sample revision plan
- `/api/health` API health check

## 4. Supabase setup

1. Create a project at https://supabase.com/.
2. In Project Settings > API, copy the project URL and publishable/anon key.
3. Copy `.env.example` to `.env.local` and fill in those values.
4. Open Supabase SQL Editor and run `supabase/schema.sql`.
5. Before real use, add and test row-level security policies for every table and a private storage bucket. The SQL file intentionally does not enable permissive policies.

Restart `npm run dev` after changing environment variables.

## 5. Suggested implementation order

1. Add Supabase Auth and user profile.
2. Create private document storage and upload validation.
3. Extract PDF text and retain page/section metadata.
4. Chunk the text, create embeddings, and store chunks in pgvector.
5. Retrieve relevant chunks for a subject/topic using RAG.
6. Generate source-grounded quiz questions with citations to page/section.
7. Score attempts, aggregate evidence by topic, and explain weak/medium/strong ratings.
8. Generate and update revision tasks based on weakness and available time.
9. Test authorization, citations, prompt injection resistance, upload limits, and AI output validation.
10. Deploy on Vercel and configure production environment variables.

## AI design rule

Do not let the model invent its own evidence. Keep source chunk IDs/page numbers with each generated question. Validate model output against a schema, reject unsupported citations, and calculate topic mastery from observed quiz evidence with a documented scoring method. A single question should not be enough to declare a topic weak or strong.
