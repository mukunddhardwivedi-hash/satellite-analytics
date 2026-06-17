#!/bin/bash

# Satellite Analytics - Setup Script

echo "======================================="
echo "Satellite Analytics - Setup Script"
echo "======================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker is installed"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker Compose is installed"
echo ""

# Create .env files if they don't exist
echo "Creating environment configuration files..."

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

if [ ! -f frontend/.env ]; then
    echo "REACT_APP_API_URL=http://localhost:5000/api" > frontend/.env
    echo "✅ Created frontend/.env"
else
    echo "⚠️  frontend/.env already exists"
fi

echo ""
echo "Building and starting Docker containers..."
echo "This may take a few minutes on first run..."
echo ""

# Build and run Docker Compose
docker-compose up --build

echo ""
echo "======================================="
echo "Setup Complete!"
echo "======================================="
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:5000"
echo "======================================="
