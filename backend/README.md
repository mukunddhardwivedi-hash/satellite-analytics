# Satellite Analytics Backend API

Backend API for the Satellite Data Visualization Platform built with Node.js, Express, and PostgreSQL.

## Features

- User authentication and authorization
- Satellite data management
- Natural event tracking
- Data analysis capabilities
- Saved locations management
- RESTful API design
- JWT authentication
- PostgreSQL database
- Comprehensive logging

## Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- PostgreSQL >= 12
- Redis (optional, for caching)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure your `.env` file with database credentials

5. Create PostgreSQL database
```bash
psql -U postgres -c "CREATE DATABASE satellite_db;"
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Satellite Data
- `GET /api/satellite` - List satellite data
- `GET /api/satellite/:id` - Get satellite data by ID
- `POST /api/satellite` - Create new satellite data (admin only)
- `PUT /api/satellite/:id` - Update satellite data (admin only)

### Natural Events
- `GET /api/events` - List natural events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)

### Analysis
- `GET /api/analysis` - List user's analyses
- `GET /api/analysis/:id` - Get analysis by ID
- `POST /api/analysis` - Create new analysis
- `PUT /api/analysis/:id` - Update analysis
- `DELETE /api/analysis/:id` - Delete analysis

### Saved Locations
- `GET /api/locations` - Get user's saved locations
- `GET /api/locations/public/list` - Get public locations
- `GET /api/locations/:id` - Get location by ID
- `POST /api/locations` - Create new location
- `PUT /api/locations/:id` - Update location
- `DELETE /api/locations/:id` - Delete location

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/update` - Update user profile
- `POST /api/users/change-password` - Change password

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js         # Application entry point
├── logs/                # Application logs
├── package.json         # Dependencies
└── README.md           # This file
```

## Environment Variables

See `.env.example` for all available configuration options.

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## License

MIT
