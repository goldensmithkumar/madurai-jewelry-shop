@echo off
title Madurai Jewelry Shop Server

:: Check for Administrative privileges
echo Checking for administrator rights...
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (
    echo.
    echo ==============================================
    echo   ADMINISTRATOR RIGHTS REQUIRED
    echo ==============================================
    echo This script needs to run as administrator to 
    echo ensure the execution policy is set correctly.
    echo.
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"

echo ==============================================
echo   MADURAI GOLD AND SILVER - Local Server
echo ==============================================
echo.

:: Set PowerShell Execution Policy
echo Configuring PowerShell execution policy...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser -Force"

echo.
:: Ask for custom port
set /p PORT="Enter port number (default 3000): "
if "%PORT%"=="" set PORT=3000

echo.
echo Starting Next.js development server on port %PORT%...
echo Open http://localhost:%PORT% in your browser
echo.

:: Run the server
call npm.cmd run dev -- -p %PORT%

echo.
echo Server stopped.
pause
