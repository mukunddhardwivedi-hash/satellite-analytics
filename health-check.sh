#!/bin/bash

# Satellite Analytics - Health Check Script

echo "======================================="
echo "Satellite Analytics - Health Check"
echo "======================================="
echo ""

# Check Docker
echo "Checking Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    docker --version
else
    echo "❌ Docker is not installed"
fi
echo ""

# Check Docker Compose
echo "Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose is installed"
    docker-compose --version
else
    echo "❌ Docker Compose is not installed"
fi
echo ""

# Check if containers are running
echo "Checking containers..."
CONTAINER_COUNT=$(docker ps --filter "label=com.docker.compose.project=satellite-analytics" --quiet | wc -l)
if [ $CONTAINER_COUNT -gt 0 ]; then
    echo "✅ Containers are running"
    docker ps --filter "label=com.docker.compose.project=satellite-analytics"
else
    echo "⚠️  No containers are running"
    echo "Run 'docker-compose up' to start"
fi
echo ""

# Check Backend API
echo "Checking Backend API..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Backend API is running"
    echo "   URL: http://localhost:5000"
else
    echo "❌ Backend API is not responding"
fi
echo ""

# Check Frontend
echo "Checking Frontend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running"
    echo "   URL: http://localhost:3000"
else
    echo "❌ Frontend is not responding"
fi
echo ""

# Check Database
echo "Checking Database..."
if docker ps | grep postgres > /dev/null; then
    echo "✅ PostgreSQL is running"
    echo "   Host: localhost"
    echo "   Port: 5432"
else
    echo "❌ PostgreSQL is not running"
fi
echo ""

echo "======================================="
echo "Health Check Complete"
echo "======================================="
