# Satellite Analytics Frontend

Frontend web application for the Satellite Data Visualization Platform built with React, Leaflet, and Ant Design.

## Features

- Interactive satellite data visualization on maps
- User authentication system
- Dashboard with statistics
- Map view with markers for satellite data and natural events
- Analysis tools and management
- User profile and settings
- Responsive design

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## Running the Application

### Development
```bash
npm start
```
The application will open at `http://localhost:3000`

### Production Build
```bash
npm build
```

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API service modules
│   ├── stores/         # Zustand state management
│   ├── App.js          # Main app component
│   ├── App.css         # App styles
│   └── index.js        # Entry point
├── package.json        # Dependencies
└── README.md           # This file
```

## Pages

- **Login** - User authentication
- **Register** - New user registration
- **Dashboard** - Overview with statistics
- **Map View** - Interactive map with data visualization
- **Analysis** - Create and manage analyses
- **Profile** - User profile and settings

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`

### Endpoints Used:

- `/auth/*` - Authentication
- `/satellite/*` - Satellite data
- `/events/*` - Natural events
- `/analysis/*` - Data analysis
- `/locations/*` - Saved locations
- `/users/*` - User management

## State Management

Using Zustand for state management:
- `authStore` - Authentication state
- `mapStore` - Map view state

## Dependencies

- **react-router-dom** - Routing
- **axios** - HTTP client
- **leaflet** - Map library
- **react-leaflet** - React wrapper for Leaflet
- **antd** - UI components
- **zustand** - State management
- **recharts** - Charting library
- **date-fns** - Date utilities

## Styling

The application uses:
- Ant Design for UI components
- CSS files for custom styling
- Responsive design for mobile compatibility

## License

MIT
