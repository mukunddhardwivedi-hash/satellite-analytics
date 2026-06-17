@echo off
REM Satellite Analytics - Setup Script for Windows

echo =======================================
echo Satellite Analytics - Setup Script
echo =======================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo X Docker is not installed. Please install Docker first.
    echo Visit: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

echo OK Docker is installed

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo X Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo OK Docker Compose is installed
echo.

REM Create .env files if they don't exist
echo Creating environment configuration files...

if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo OK Created backend\.env
) else (
    echo WARNING backend\.env already exists
)

if not exist frontend\.env (
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > frontend\.env
    echo OK Created frontend\.env
) else (
    echo WARNING frontend\.env already exists
)

echo.
echo Building and starting Docker containers...
echo This may take a few minutes on first run...
echo.

REM Build and run Docker Compose
docker-compose up --build

echo.
echo =======================================
echo Setup Complete!
echo =======================================
echo Access the application at:
echo   Frontend: http://localhost:3000
echo   Backend: http://localhost:5000
echo =======================================
pause
