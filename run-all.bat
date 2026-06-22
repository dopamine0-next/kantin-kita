@echo off
title Kantin Kita - All Services
cd /d "%~dp0"

echo ========================================
echo   Kantin Kita - Starting All Services
echo ========================================
echo.

echo Starting Backend (Spring Boot)...
start "Kantin-Backend" cmd /c "cd /d "%~dp0backend" && .\mvnw spring-boot:run"

echo Starting Frontend Web (Next.js)...
start "Kantin-Frontend" cmd /c "cd /d "%~dp0frontend" && npm run dev"

echo Starting Frontend Admin (Java Swing)...
start "Kantin-Admin" cmd /c "cd /d "%~dp0frontend-admin" && mvn exec:java"

echo Starting Frontend Kantin (Java Swing)...
start "Kantin-Kantin" cmd /c "cd /d "%~dp0frontend-kantin" && mvn exec:java"

echo.
echo All services started in separate windows.
echo.
echo   Backend:        http://localhost:8080
echo   Frontend:       http://localhost:3000
echo.
echo Close each window individually to stop services.
pause
