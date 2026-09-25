# Admission Lead Management System

A small, practical admission CRM for managing enquiries from first contact through follow-up and conversion.

## Features

- Demo login with Manager and Counsellor roles
- Dashboard with pipeline summary, ageing, follow-up, source, and status insights
- Lead CRUD with search and filters for status, source, course, and counsellor
- Lead ageing indicator: New (0-2 days), Normal (3-7), Ageing (8-14), Old (15+)
- Counsellor assignment and quick status updates
- Activity timeline for calls, WhatsApp, email, meetings, and notes
- Follow-up queue with today, upcoming, and overdue views
- Reports for source, status, course, counsellor, conversion, and loss
- MongoDB seed script with 18 realistic leads

## Tech Stack

- Next.js 14 App Router and TypeScript
- Tailwind CSS utilities with focused custom CSS for the dashboard
- Next.js Route Handlers
- MongoDB and Mongoose
- Recharts
- Lucide React

## Project Structure

```text
app/                 Pages and API route handlers
components/          Dashboard, forms, tables, charts, and workflow UI
lib/                 Constants, validation, database, auth, metrics, and seed data
models/              Mongoose Lead and User models
scripts/              Database seed command
```

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```env
MONGODB_URI=mongodb://localhost:27017/admission-lead-management
```

MongoDB Atlas works with an Atlas connection string in the same variable.

## Installation and Run

```bash
npm install
npm run seed
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

`npm run lint` runs the TypeScript compiler in no-emit mode.

## MongoDB Setup

For a local database, install MongoDB Community Edition and start the MongoDB service. The default database name is `admission-lead-management`; MongoDB creates it when the seed command runs. For Atlas, create a database user, allow the development IP, and place the Atlas URI in `.env.local`.

## Demo Login

- Manager: `manager@example.com` / `manager123`
- Counsellor: `counsellor@example.com` / `counsellor123`

The MVP uses local storage for the demo session. The selected role is available to the UI, while the database and route structure can be extended with real authentication later.

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/leads` | List leads with search and filters |
| POST | `/api/leads` | Create a lead |
| GET | `/api/leads/[id]` | Read one lead |
| PUT | `/api/leads/[id]` | Update lead fields |
| DELETE | `/api/leads/[id]` | Delete a lead |
| POST | `/api/leads/[id]/activities` | Add an activity |
| GET | `/api/dashboard` | Dashboard metrics |
| GET | `/api/follow-ups` | Follow-up queue and counts |
| POST | `/api/follow-ups/[id]/complete` | Complete a follow-up |
| GET | `/api/reports` | Report metrics |

## Validation and Assumptions

- Name, phone, course, and source are required.
- Phone numbers use a basic international-friendly pattern.
- Email is checked only when supplied.
- Phone numbers are unique in MongoDB.
- Invalid IDs, duplicate phones, invalid enums, empty search results, no follow-ups, and zero-lead conversion calculations return safe responses.
- Follow-up dates may be in the past because that is how overdue work is represented.
- Demo authentication is intentionally lightweight for the assignment; it is not production security.
- A counsellor role is represented in the client session and seed data. The MVP keeps API authorization simple to stay interview-friendly.

## How AI Was Used

OpenAI Codex was used to generate the initial application structure, UI components, API route handlers, Mongoose models, validation, seed data, and supporting documentation. The application was reviewed through TypeScript checks, production builds, and runtime smoke tests; implementation decisions and any fixes are recorded in `AI_USAGE_REPORT.md`.
