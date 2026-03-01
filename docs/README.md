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

### Deploying the Web app on Hostinger (Business plan)
Hostinger’s **Node.js Web App** importer expects a supported framework at the **repository root** with standard `build`/`start` scripts.

- **Framework**: Next.js
- **Build command**: `npm run build`
- **Start command**: `npm start`
- **Node version**: set to **22.x** (latest) in hPanel

Environment variables (hPanel → Node.js app → Environment):
- **`NEXT_PUBLIC_API_BASE`**: your public API base URL (example: `https://api.your-domain.com`)

Note: the API (`apps/api`) should be deployed separately (another Hostinger Node.js app / subdomain) or hosted elsewhere, then point the web app to it via `NEXT_PUBLIC_API_BASE`.

