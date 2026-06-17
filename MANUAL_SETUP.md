# Manual Setup Guide

If Docker is not available or you prefer to run the application manually, follow these steps:

## Prerequisites

- Node.js >= 16.0.0 (Download from https://nodejs.org/)
- PostgreSQL >= 12 (Download from https://www.postgresql.org/download/)
- npm >= 8.0.0 (comes with Node.js)

## Step 1: Install Node.js and PostgreSQL

### Windows
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Run the installer and follow the steps
3. Download PostgreSQL from https://www.postgresql.org/download/
4. Run the PostgreSQL installer
5. Note the password you set for the `postgres` user

### macOS
```bash
# Using Homebrew
brew install node
brew install postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install nodejs npm postgresql postgresql-contrib
```

## Step 2: Create Database

### Windows (pgAdmin or Command)
1. Open pgAdmin (comes with PostgreSQL)
2. Create a new database named `satellite_db`

Or use command line:
```bash
psql -U postgres
CREATE DATABASE satellite_db;
\q
```

### macOS/Linux
```bash
# Create database
createdb -U postgres satellite_db

# Or using psql
psql -U postgres
CREATE DATABASE satellite_db;
\q
```

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` and update:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<your_postgres_password>
DB_NAME=satellite_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_12345
FRONTEND_URL=http://localhost:3000
```

### Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
Server is running on http://localhost:5000
Database synchronized successfully
```

## Step 4: Frontend Setup

### In a new terminal window

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

The frontend will automatically open at http://localhost:3000

## Step 5: Access the Application

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:5000
3. **API Health Check**: http://localhost:5000/health

## Testing the Setup

### Register a New Account
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   - Email: test@example.com
   - Username: testuser
   - Password: password123
   - First Name: Test (optional)
   - Last Name: User (optional)
4. Click "Register"

### Login
1. Enter your email and password
2. Click "Login"
3. You should be redirected to the Dashboard

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

```bash
# Find and kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error

1. Verify PostgreSQL is running:
   ```bash
   psql -U postgres
   ```

2. Check database exists:
   ```bash
   psql -U postgres -l | grep satellite_db
   ```

3. Verify .env file has correct credentials

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 Not Opening

Manually open your browser and visit: http://localhost:3000

## Stopping the Application

### Backend
Press `Ctrl + C` in the backend terminal

### Frontend
Press `Ctrl + C` in the frontend terminal

## Environment Variables Reference

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=satellite_db

# Server
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your_jwt_secret_key_here

# CORS
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Next Steps

1. **Create an admin user** (optional)
2. **Configure satellite data sources**
3. **Add natural events**
4. **Create analyses**
5. **Deploy to production** (see deployment guide)

## Support

If you encounter issues:

1. Check the logs:
   - Backend: `backend/logs/error.log`
   - Frontend: Browser console (F12)

2. Verify all prerequisites are installed

3. Ensure ports 3000 and 5000 are not in use

4. Check database connection credentials

5. Try clearing node_modules and reinstalling

## Useful Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests

# Frontend
cd frontend
npm install          # Install dependencies
npm start            # Start development server
npm build            # Build for production
npm test             # Run tests
```
