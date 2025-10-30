HEAD
News Project (minimal full-stack)

Structure:
- backend/      Express server, MySQL pool, API endpoints
- frontend/     Vite + React app (components + pages)

Setup backend:
1. Set up MySQL and run backend/schema.sql to create DB and example allowed email.
2. Create a .env or set env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
3. cd backend
4. npm install
5. npm run dev   (or npm start)

Setup frontend:
1. cd frontend
2. npm install
3. npm run dev
4. The frontend expects the backend at the same origin (e.g., /api/*). If backend runs on different port, configure proxy in vite.config or use full URL in fetch calls.

Notes:
- This implementation uses allowed_emails whitelist. It does NOT verify email ownership.
- For production, add input sanitization, rate-limiting, HTTPS, and proper error handling.

# news_project
News Project est une application web construite avec React, Node.js et MySQL. Elle affiche des actualités par catégorie, permet de voir les détails des articles et d’ajouter des commentaires via une interface moderne et interactive.
 db9f46046d45885133e1dbf99a28e532432a6f2a
