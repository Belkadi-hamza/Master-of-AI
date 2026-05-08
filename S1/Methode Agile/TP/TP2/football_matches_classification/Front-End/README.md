# Front-End (React + Vite)

UI for submitting match statistics and visualizing the predicted outcome returned by the FastAPI backend.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## Run locally

1) Install dependencies
2) Start the dev server: npm run dev

## API integration

The UI sends a POST request to http://localhost:8000/predict with the following fields:

- home_shots
- home_shotsOnTarget
- home_ppda
- away_shots
- away_shotsOnTarget
- away_ppda

If the backend runs on a different host/port, update the URL in src/pages/Index.tsx.

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm run test
