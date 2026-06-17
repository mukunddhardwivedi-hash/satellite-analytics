# Satellite Data Visualization & Analytics Platform

A comprehensive web application for visualizing and analyzing satellite imagery, weather data, and environmental metrics in real-time. Compare historical and current data to track changes in rainfall, vegetation, temperature, and land-use patterns.

## 🌍 Features

- **Interactive Map Visualization**: Leaflet-based maps with multiple satellite imagery layers
- **Real-time Data Integration**: NASA EONET, Copernicus, and weather APIs
- **Temporal Analysis**: Time-slider to compare historical and current satellite data
- **Multi-Layer Support**:
  - Rainfall patterns and precipitation
  - Vegetation indices (NDVI)
  - Temperature variations
  - Land-use classification
  - Natural disasters and events
- **Advanced Tools**:
  - Region comparison
  - Data export (PNG, GeoJSON, CSV)
  - Custom alerts and monitoring
  - Historical data analysis
- **Professional Dashboard**: Real-time metrics, trends, and insights
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Leaflet** - Interactive mapping
- **Axios** - HTTP client
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization charts

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Redis** - Caching
- **Docker** - Containerization

### External APIs
- NASA EONET (Natural events)
- Copernicus Open Access Hub (Satellite imagery)
- OpenWeatherMap (Weather data)
- USGS (Elevation & land data)

## 📁 Project Structure

```
satellite-analytics/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── index.js
│   ├── migrations/         # Database migrations
│   └── package.json
├── docker-compose.yml       # Docker orchestration
├── .env.example            # Environment variables template
└── README.md              # This file

```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mukunddhardwivedi-hash/satellite-analytics.git
cd satellite-analytics
```

2. **Setup with Docker (Recommended)**
```bash
docker-compose up --build
```

The app will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- PostgreSQL: `localhost:5432`

3. **Manual Setup**

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials and API keys
npm run migrate
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/satellite_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key

# External APIs
NASA_API_KEY=your_nasa_api_key
OPENWEATHERMAP_API_KEY=your_openweathermap_key
COPERNICUS_USERNAME=your_copernicus_username
COPERNICUS_PASSWORD=your_copernicus_password

# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## 📊 API Endpoints

### Satellite Data
- `GET /api/satellite/imagery` - Fetch satellite imagery
- `GET /api/satellite/ndvi/:region/:date` - Vegetation index
- `GET /api/satellite/temperature/:region/:date` - Temperature data
- `GET /api/satellite/rainfall/:region/:date` - Rainfall data

### Events
- `GET /api/events` - Natural disasters and events
- `GET /api/events/:type` - Filter by event type

### Analysis
- `GET /api/analysis/compare/:region/:startDate/:endDate` - Compare time periods
- `POST /api/analysis/export` - Export data

### User Management
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/saved-regions` - User's saved locations

## 🗺 Map Layers

- **Satellite Imagery**: True color and false color composites
- **Vegetation Index (NDVI)**: Normalized Difference Vegetation Index
- **Temperature**: Thermal imaging overlay
- **Precipitation**: Rainfall and moisture patterns
- **Land Use**: Classification and change detection
- **Events**: Natural disasters, fires, floods
- **Elevation**: 3D terrain visualization

## 📈 Dashboard Features

- Real-time metric cards (temperature, rainfall, vegetation)
- Time-series charts for trend analysis
- Region comparison tools
- Heatmaps and density visualizations
- Alert system for significant changes
- Historical data export

## 🔐 Security Features

- JWT authentication
- Role-based access control (RBAC)
- Rate limiting on APIs
- Input validation and sanitization
- HTTPS/TLS encryption
- Secure password hashing (bcrypt)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📚 Documentation

- [Backend API Documentation](./backend/API.md)
- [Frontend Component Guide](./frontend/COMPONENTS.md)
- [Database Schema](./backend/SCHEMA.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🌐 Live Demo

Coming soon...

## 📦 Available Scripts

### Backend
- `npm start` - Start development server
- `npm run dev` - Start with hot reload
- `npm run migrate` - Run database migrations
- `npm test` - Run tests
- `npm run build` - Build for production

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for EONET and satellite data APIs
- Copernicus for open access satellite imagery
- Leaflet for mapping library
- React community for excellent tools and documentation

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation

## 🔄 Updates & Roadmap

- [ ] Machine learning models for predictive analytics
- [ ] Advanced image processing and analysis
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Collaborative workspaces
- [ ] Custom algorithm support
- [ ] Integration with more data sources
- [ ] Advanced GIS tools

---

**Built with ❤️ for Earth Observation and Environmental Analytics**
