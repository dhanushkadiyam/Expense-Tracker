# Expense Tracker

A full-stack personal finance application for tracking income and expenses, viewing dashboard summaries, and managing account preferences.

## Features

- User registration and JWT-based login
- Protected income and expense management
- Add, edit, search, filter, and delete transactions
- Dashboard summaries with income, expenses, balance, and charts
- Monthly budget tracking with near-limit and over-limit alerts
- Monthly savings-rate KPI
- Payment method tagging and category presets
- Date, amount, payment method, and sorting filters
- One-click demo data generation with duplicate protection
- CSV and PDF transaction exports
- Light, dark, and system theme modes
- Profile updates, password changes, and account deletion
- MongoDB connection with an automatic in-memory fallback for local zero-setup development

## Project Structure

```text
Backend/    Express API, MongoDB models, controllers, and routes
Frontend/   React and Vite client application
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB, optional for local development

## Setup

Clone the repository and install dependencies in both applications:

```bash
git clone https://github.com/dhanushkadiyam/Expense-Tracker.git
cd Expense-Tracker

cd Backend
npm install

cd ../Frontend
npm install
```

### Backend environment

Create `Backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=replace_with_a_long_random_secret
```

`MONGO_URI` is optional. If the configured MongoDB server is unavailable, the backend starts `mongodb-memory-server` automatically for the current process.

Set `NODE_ENV=production` in deployed environments. In production, the backend will fail startup instead of silently using an in-memory database when MongoDB is unavailable.

### Frontend environment

To point the frontend at a deployed API, create `Frontend/.env`:

```env
VITE_API_URL=https://your-api.example.com/api
```

If omitted, the frontend uses `http://localhost:5000/api` for local development.

## Run Locally

Open two terminals from the repository root.

Terminal 1, backend:

```bash
cd Backend
npm run dev
```

Terminal 2, frontend:

```bash
cd Frontend
npm run dev
```

Open `http://localhost:5173` in a browser. The API runs at `http://localhost:5000` and the health endpoint is available at `http://localhost:5000/`.

## Production Checks

Build the frontend:

```bash
cd Frontend
npm run build
```

Run frontend linting:

```bash
npm run lint
```

Start the backend without file watching:

```bash
cd Backend
npm start
```

## API Overview

All transaction, dashboard, and user-management routes require a bearer token unless stated otherwise.

| Area           | Routes                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`                                              |
| Expenses       | `GET/POST /api/expenses`, `PUT/DELETE /api/expenses/:id`                                                                |
| Income         | `GET/POST /api/income`, `PUT/DELETE /api/income/:id`                                                                    |
| Dashboard      | `GET /api/dashboard`                                                                                                    |
| User settings  | `PUT /api/users/profile`, `PUT /api/users/budget`, `PUT /api/users/change-password`, `DELETE /api/users/delete-account` |
| Demo data      | `POST /api/demo-data`                                                                                                   |

## Security Notes

- Keep `Backend/.env` private and never commit production secrets.
- Use a long, random `JWT_SECRET` outside local development.
- Configure a persistent MongoDB instance for production instead of the in-memory fallback.
