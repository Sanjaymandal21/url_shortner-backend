# URL Shortener Backend - Deployment Guide

## Overview
This is a Node.js/Express backend API for URL shortening with user authentication. It's configured for deployment on Vercel.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB database (MongoDB Atlas recommended)
- SMTP credentials for email functionality
- Vercel account

## Setup Instructions

### 1. Local Development
```bash
# Install dependencies
npm install

# Create .env file with your local configuration
cp .env.example .env

# Start development server with hot reload
npm run dev
```

### 2. Environment Variables
Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/urlShortner
JWT_SECRET=your_secure_jwt_secret_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### 3. Vercel Deployment

#### Using Vercel CLI:
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Using Vercel Dashboard:
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure environment variables in project settings
5. Deploy

### 4. Setting Environment Variables on Vercel

Go to Project Settings → Environment Variables and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGO_URI` | Your MongoDB connection string | Must include username, password, and database name |
| `JWT_SECRET` | A secure random string | Generate using `openssl rand -base64 32` |
| `SMTP_USER` | Your Gmail address | For email notifications |
| `SMTP_PASS` | Gmail App Password | Not your regular password |
| `FRONTEND_URL` | Your frontend domain | https://your-domain.com |
| `NODE_ENV` | production | Set for production environment |

### 5. API Endpoints

- **Health Check**: `GET /`
- **User Routes**: `/user/*` (register, login, etc.)
- **URL Routes**: `/url/*` (shorten, redirect, views, etc.)

## Important Notes

- **CORS**: Frontend URL is configured via `FRONTEND_URL` environment variable
- **Database**: MongoDB connection handles automatic retries
- **Port**: Vercel assigns ports dynamically; the app uses `PORT` env var or defaults to 3000
- **JWT Secret**: Must be kept secure; generate a strong random string in production

## Troubleshooting

### Deployment fails
1. Check that all required environment variables are set
2. Verify MongoDB connection string is correct and IP is whitelisted
3. Review Vercel deployment logs for specific errors

### CORS errors
- Ensure `FRONTEND_URL` matches your actual frontend domain
- Include protocol (https://) in the URL

### Database connection issues
- Verify MongoDB Atlas IP whitelist includes Vercel's IP ranges
- Test connection string locally first
- Check MONGO_URI format: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

## Scripts

```bash
npm start     # Run production server
npm run dev   # Run development server with nodemon
```

## File Structure

```
src/
├── index.js              # Entry point
├── app.js                # Express app configuration
├── controller/           # Route controllers
├── models/               # Mongoose models
├── routers/              # API routes
├── middlewares/          # Custom middleware
├── utils/                # Utility functions
├── helpers/              # Helper functions
└── db/                   # Database configuration
```

## License
ISC
