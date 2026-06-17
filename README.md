# Satellite Analytics - Complete Application

A full-stack satellite data visualization and analysis platform built with Node.js, React, PostgreSQL, and Leaflet maps.

## Project Structure

```
satellite-analytics/
├── backend/                # Node.js/Express API
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── index.js       # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── stores/        # State management (Zustand)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── README.md
├── docker-compose.yml     # Docker orchestration
└── README.md              # This file
```

## Features

### Backend
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database with Sequelize ORM
- ✅ JWT-based authentication
- ✅ User management and profiles
- ✅ Satellite data management
- ✅ Natural event tracking
- ✅ Data analysis tools
- ✅ Saved locations management
- ✅ Role-based access control
- ✅ Comprehensive logging
- ✅ Error handling

### Frontend
- ✅ React 18 application
- ✅ Interactive map visualization (Leaflet)
- ✅ User authentication and profiles
- ✅ Dashboard with statistics
- ✅ Data analysis interface
- ✅ Responsive design
- ✅ State management with Zustand
- ✅ Ant Design UI components
- ✅ Real-time data updates

### Infrastructure
- ✅ Docker containerization
- ✅ Docker Compose orchestration
- ✅ PostgreSQL database
- ✅ Nginx reverse proxy
- ✅ Development and production ready

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. Clone the repository
```bash
git clone <repository-url>
cd satellite-analytics
```

2. Start all services
```bash
docker-compose up --build
```

3. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Default Credentials
- Database User: `postgres`
- Database Password: `postgres`
- Database Name: `satellite_db`

## Manual Setup (Without Docker)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your database credentials, then:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

### Database Setup

Create PostgreSQL database:
```bash
psql -U postgres -c "CREATE DATABASE satellite_db;"
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

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=satellite_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Models

1. **User** - User accounts and authentication
2. **SatelliteData** - Satellite imagery and measurements
3. **NaturalEvent** - Natural disaster events
4. **SavedLocation** - User's bookmarked locations
5. **Analysis** - User's data analysis projects

## Technology Stack

### Backend
- Node.js & Express.js
- PostgreSQL & Sequelize ORM
- JWT Authentication
- Winston Logger
- Helmet Security

### Frontend
- React 18
- React Router v6
- Zustand (State Management)
- Leaflet (Map Library)
- Ant Design (UI Components)
- Axios (HTTP Client)
- Recharts (Charting)

### DevOps
- Docker & Docker Compose
- Nginx Reverse Proxy
- PostgreSQL Container

## Development

### Running Tests

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

### Building for Production

```bash
docker-compose -f docker-compose.yml up -d
```

Or individually:

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
npm run build
```

## Logging

Logs are stored in `backend/logs/`:
- `combined.log` - All logs
- `error.log` - Error logs only

## Project Status

✅ Complete - Production Ready

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

## Contact

Mukund Dwivedi
Email: mukunddhardwivedi@gmail.com
