@echo off
REM Satellite Analytics - Health Check Script for Windows

echo =======================================
echo Satellite Analytics - Health Check
echo =======================================
echo.

REM Check Docker
echo Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo X Docker is not installed
) else (
    echo OK Docker is installed
    docker --version
)
echo.

REM Check Docker Compose
echo Checking Docker Compose...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo X Docker Compose is not installed
) else (
    echo OK Docker Compose is installed
    docker-compose --version
)
echo.

REM Check if containers are running
echo Checking containers...
for /f "tokens=*" %%i in ('docker ps --filter "label=com.docker.compose.project=satellite-analytics" --quiet 2^>nul ^| find /c /v ""') do set COUNT=%%i
if %COUNT% gtr 0 (
    echo OK Containers are running
    docker ps --filter "label=com.docker.compose.project=satellite-analytics"
) else (
    echo WARNING No containers are running
    echo Run 'docker-compose up' to start
)
echo.

REM Check Backend API
echo Checking Backend API...
timeout /t 1 /nobreak > nul
curl -s http://localhost:5000/health >nul 2>&1
if errorlevel 1 (
    echo X Backend API is not responding
) else (
    echo OK Backend API is running
    echo    URL: http://localhost:5000
)
echo.

REM Check Frontend
echo Checking Frontend...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo X Frontend is not responding
) else (
    echo OK Frontend is running
    echo    URL: http://localhost:3000
)
echo.

REM Check Database
echo Checking Database...
docker ps 2>nul | findstr postgres >nul
if errorlevel 1 (
    echo X PostgreSQL is not running
) else (
    echo OK PostgreSQL is running
    echo    Host: localhost
    echo    Port: 5432
)
echo.

echo =======================================
echo Health Check Complete
echo =======================================
pause
