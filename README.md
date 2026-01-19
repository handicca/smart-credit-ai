# Smart Credit AI

<p align="center">
  <img src="app/favicon.ico" alt="Smart Credit AI icon" width="96" height="96" />
</p>

**Smart Credit AI** is a web app for running **credit eligibility** and **risk scoring** predictions using selectable ML models, with a clean UI and charts to help interpret results.

## Tech stack

- **Framework**: Next.js (App Router)
- **UI**: React, Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Linting**: ESLint (Next.js config)

## Requirements

- **Node.js**: recommended 18+ (or 20+)
- **npm** (project includes `package-lock.json`)

## Setup

1) Install dependencies

```bash
npm install
```

2) Create `.env.local` in the project root (required for predictions)

```bash
# Base URL of your prediction backend (example)
PREDICT_API_BASE_URL=http://localhost:8000

# Backend endpoints (paths) for each model
PREDICT_XGBOOST_ENDPOINT=/predict/xgboost
PREDICT_RF_ENDPOINT=/predict/random-forest
PREDICT_LOGREG_ENDPOINT=/predict/logreg
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## How to use the app

- **Home**: landing page (`/`)
- **Demo**: interactive prediction form (`/demo`)
  - Choose a model (**xgboost**, **random_forest**, **logreg**)
  - Fill in applicant + loan + asset information
  - Submit to get decision + confidence + asset/loan ratio

## API

- **POST** ` /api/predict`
  - Proxies to your configured backend using `PREDICT_API_BASE_URL` + the selected model endpoint.
  - The UI posts form data to this route, so you usually only need to configure env vars.

## Production

```bash
npm run build
npm run start
```

## Project structure (high level)

- **`app/`**: routes, layout, API route (`app/api/predict/route.js`)
- **`components/`**: UI components (form, gauges, charts)
- **`lib/`**: constants + payload building + validation
