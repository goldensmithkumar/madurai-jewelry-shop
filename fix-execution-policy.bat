@echo off
title Fix Execution Policy
echo ==============================================
echo   Allowing PowerShell Scripts to Run
echo ==============================================
echo.
echo Setting Execution Policy to Bypass for CurrentUser...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser -Force"
echo.
echo Execution policy updated! You can now run scripts.
echo.
pause
