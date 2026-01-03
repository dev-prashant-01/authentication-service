Authentication and User Management service

A production-ready authentication service built with Node js, PostgreSQL and JWT

Key Feature:

    User registration and login (email + password)
    Secure password hashing using bcrypt
    JWT-based authentication
    Clean, moduler architecture

Client (Web / Mobile) -> Auth API (Node.js + Express) -> PostgreSQL Database (Prisma ORM)

Tech Stack:

    Backend: Node.js, Express.js
    Database: PostgreSQL
    ORM: Prisma
    Authentication: JWT (Access & Refresh Tokens)
    Security: bcrypt
    Dev Tools: Nodemon, dotenv
    Deployment: Docker (optional)

API Endpoints:

    Register USER:

        url: POST /api/auth/register
        body: {
            "email": "user@example.com",
            "password": "strongpassword"
        }

    Login USER:

        url: POST /api/auth/login
        body: {
            "email": "user@example.com",
            "password": "strongpassword"
        }

Environment Variables:
create .env file using below:

    PORT=4000
    DATABASE_URL=postgresql://username:password@localhost:5432/dbname
    JWT_ACCESS_SECRET=your_access_secret
    JWT_REFRESH_SECRET=your_refresh_secret
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d

Local setup:

    git clone https://github.com/dev-prashant-01/authentication-service
    cd auth-service

    npm install
    npx prisma migrate dev

    npm run dev
