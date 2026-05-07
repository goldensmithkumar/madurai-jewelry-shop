@echo off
echo ==============================================
echo   Stopping Madurai Jewelry Next.js Server
echo ==============================================
echo.
echo Looking for process running on Port 3000...

FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr LISTENING ^| findstr :3000') DO (
  echo Killing Process ID %%T...
  taskkill /PID %%T /F
)

echo.
echo Server gracefully stopped! 
echo.
pause
