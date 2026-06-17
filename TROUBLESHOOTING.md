# Troubleshooting Guide

## Common Issues and Solutions

### Docker Issues

#### 1. Docker not running
**Error**: `Cannot connect to Docker daemon`

**Solution**:
- Make sure Docker Desktop is running (on Windows/macOS)
- On Linux, start Docker: `sudo systemctl start docker`

#### 2. Port already in use
**Error**: `Port 5000 is already allocated` or `Port 3000 is already allocated`

**Solution**:
```bash
# Linux/macOS - Find and kill process
lsof -ti:5000 | xargs kill -9    # Kill port 5000
lsof -ti:3432 | xargs kill -9    # Kill port 3432

# Windows - Using PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

Or use different ports in `docker-compose.yml`:
```yaml
backend:
  ports:
    - "5001:5000"  # Change to 5001

frontend:
  ports:
    - "3001:80"    # Change to 3001
```

#### 3. Out of disk space
**Error**: `No space left on device`

**Solution**:
```bash
# Clean up Docker
docker-compose down
docker system prune -a
```

### Database Issues

#### 1. Database connection failed
**Error**: `Cannot connect to database`

**Solution**:
1. Check PostgreSQL container is running:
   ```bash
   docker ps | grep postgres
   ```

2. Verify credentials in `.env`

3. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

4. Restart services:
   ```bash
   docker-compose restart
   ```

#### 2. Database sync errors
**Error**: `Error: relation does not exist`

**Solution**:
1. Drop and recreate database:
   ```bash
   docker-compose exec postgres psql -U postgres -c "DROP DATABASE satellite_db;"
   docker-compose exec postgres psql -U postgres -c "CREATE DATABASE satellite_db;"
   ```

2. Restart backend:
   ```bash
   docker-compose restart backend
   ```

### Backend Issues

#### 1. npm install fails
**Error**: `npm ERR! code E404`

**Solution**:
```bash
cd backend
rm package-lock.json
npm cache clean --force
npm install
```

#### 2. Module not found
**Error**: `Cannot find module 'express'`

**Solution**:
```bash
cd backend
npm install
```

#### 3. JWT authentication failing
**Error**: `Invalid or expired token`

**Solution**:
1. Check JWT_SECRET is set in `.env`
2. Clear browser cookies and localStorage
3. Log out and log back in

### Frontend Issues

#### 1. Blank page or white screen
**Error**: Page shows nothing

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Hard refresh: `Ctrl+Shift+R`

#### 2. API call failing
**Error**: `Failed to fetch from http://localhost:5000/api`

**Solution**:
1. Verify backend is running: http://localhost:5000/health
2. Check REACT_APP_API_URL in `frontend/.env`
3. Check browser console for CORS errors
4. Ensure backend CORS is configured correctly

#### 3. Map not loading
**Error**: Map shows blank

**Solution**:
1. Check browser console for errors
2. Verify Leaflet CSS is loaded
3. Clear cache and refresh

### Network Issues

#### 1. Cannot access http://localhost:3000
**Error**: Page cannot be accessed

**Solution**:
1. Check frontend is running: `npm start`
2. Try http://127.0.0.1:3000
3. Check firewall settings
4. Try different port: change in docker-compose.yml

#### 2. CORS errors
**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
1. Verify FRONTEND_URL in backend `.env`
2. Check CORS configuration in `backend/src/index.js`
3. Ensure API URL in frontend matches backend

### Node/npm Issues

#### 1. Node version mismatch
**Error**: `npm ERR! The engine "node" is incompatible`

**Solution**:
```bash
# Check Node version
node --version

# Should be >= 14.0.0
# Update Node from https://nodejs.org/
```

#### 2. npm permission denied
**Error**: `npm ERR! code EACCES`

**Solution**:
```bash
# Change npm permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Build Issues

#### 1. Docker build fails
**Error**: `Error building image`

**Solution**:
```bash
# Clean and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

#### 2. Frontend build fails
**Error**: `npm ERR! code ENOENT`

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm build
```

### Performance Issues

#### 1. Application running slowly
**Solution**:
1. Check system resources: `docker stats`
2. Increase Docker memory:
   - Go to Docker settings
   - Increase available memory

#### 2. Database queries slow
**Solution**:
1. Check indexes are created
2. Monitor with: `docker-compose logs -f backend`
3. Consider adding caching

## Getting Help

If your issue isn't listed:

1. **Check logs**:
   ```bash
   docker-compose logs -f
   ```

2. **Check individual service logs**:
   ```bash
   docker-compose logs -f backend
   docker-compose logs -f frontend
   docker-compose logs -f postgres
   ```

3. **Verify health**:
   ```bash
   curl http://localhost:5000/health
   ```

4. **Full restart**:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

## Still Having Issues?

1. Check the repository README
2. Review the MANUAL_SETUP.md for manual installation
3. Check Docker and Node.js documentation
4. Open an issue on GitHub with:
   - Error message
   - Logs
   - Your system info (OS, Docker version, Node version)
