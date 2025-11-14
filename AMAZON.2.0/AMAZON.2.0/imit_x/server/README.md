# Imit Amazon — backend

Lightweight Express server for development. Uses MySQL (mysql2).

Setup

1. Create a MySQL database and user or use the `server/schema.sql` to create tables.
2. Copy `.env.example` to `.env` and set DB credentials.
3. Install dependencies:

   npm install

4. Start server:

   npm run start

Endpoints (dev)

- GET /api/health
- POST /api/auth/signup  { name, email, password, role }
- POST /api/auth/login   { email, password, role }
- GET /api/products?q=&category=&minPrice=&maxPrice=
- GET /api/products/:id
- POST /api/cart { client_id, product_id, quantity }
- GET /api/cart/:clientId

This is a minimal scaffold for local development only. Passwords are stored in plain text for demo purposes — replace with hashing in production.
