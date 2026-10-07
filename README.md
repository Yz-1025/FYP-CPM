# FYP-CPM

Hong Kong Chinese Patent Medicine (CPM) unified database and web front-end (FYP).

## Stack

- **Frontend:** Vue 3 + Vite + Bootstrap
- **Backend:** Node.js + Express (JavaScript)
- **Database:** Azure Cosmos DB for MongoDB (RU)

## Setup

1. Copy `.env.example` to `.env` and set `COSMOS_CONNECTION_STRING`.
2. Backend: `cd backend` → `npm install` → `npm start` (port 5000).
3. Frontend: `cd frontend` → `npm install` → `npm run dev`.

See `docs/AZURE_COSMOS_SETUP.md` and `docs/DATA_MODEL.md`.
