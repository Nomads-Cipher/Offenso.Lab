## CipherDocs - Local run guide

### Prerequisites
- Node.js installed
- MongoDB running locally on `127.0.0.1:27017` (or update `MONGODB_URI`)

### Start the API
1. Copy env:
   - `apps/api/.env.example` → `apps/api/.env`
2. Install and seed:
   - `cd apps/api`
   - `npm install`
   - `npm run seed`
3. Run:
   - `npm run dev`

API: `http://127.0.0.1:4000`\nGraphQL: `http://127.0.0.1:4000/api/graphql`

### Start the Web app
1. Copy env:
   - `apps/web/.env.example` → `apps/web/.env.local`
2. Install and run:
   - `cd apps/web`
   - `npm install`
   - `npm run dev`

Web: `http://localhost:3000`

### Labs
See `docs/labs/` for step-by-step exercises.

### Hosting note
Run this locally (loopback) for classroom use; avoid exposing it on a public interface.

