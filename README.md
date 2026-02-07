# Trip Nest

Trip Nest is a modern travel booking experience built with Next.js App Router. It includes public pages for tours, bookings, blog, and contact, plus account and admin areas for managing users, tours, and bookings.

## Features

- Tours discovery with filtering and curated collections
- Bookings and favorites pages
- Auth flows (sign in, sign up, forgot password)
- Blog listing and article pages
- Profile and settings area
- Admin dashboard for users, tours, and bookings

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build for production
- `npm run start` — run the production server
- `npm run lint` — run ESLint

## Project Structure

- app/ — App Router pages and layouts
- components/ — UI components grouped by feature
- lib/api/ — API client helpers
- data/ — mock data and navigation
- types/ — TypeScript types

## Deployment

Build and start for production:

```bash
npm run build
npm run start
```
