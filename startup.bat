@echo off

REM ### BACKEND ###

REM Change to the backend directory
cd backend

REM Check for a virtual environment
if exist "venv" (
    echo Activating virtual environment
    call venv\Scripts\activate.bat
) else (
    echo No virtual environment found
)

REM Check if Python is installed
where python
if %errorlevel% neq 0 (
    echo Python is not installed
    exit /b 1
)

REM Install backend dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo Installing backend dependencies from requirements.txt
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo Failed to install backend dependencies
        exit /b 1
    )
)


REM Start the backend
echo Starting backend server
cd app
where uvicorn
if %errorlevel% equ 0 (
    start "Backend Server" cmd /k "uvicorn main:app --reload --host 0.0.0.0"
) else (
    start "Backend Server" cmd /k "python -m uvicorn main:app --reload --host 0.0.0.0"
)


REM ### FRONTEND ###

cd ../../frontend

REM Check if Node.js is installed
where node
if %errorlevel% neq 0 (
    echo Node.js is not installed
    exit /b 1
)

REM Install frontend dependencies if package.json exists
if exist "package.json" (
    echo Installing frontend dependencies
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install frontend dependencies
        exit /b 1
    )
)

REM Start the frontend
echo Starting frontend development server
start "Frontend Server" cmd /c "npm run start"


REM ### POS ###
REM todo