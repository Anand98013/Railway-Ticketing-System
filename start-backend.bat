@echo off
cd /d "%~dp0backend"
echo Starting Railway Ticketing backend on http://localhost:8080
call mvn spring-boot:run
pause
