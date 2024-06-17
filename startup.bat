@echo on

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

REM Check if dev_database.db exists and delete it
if exist "dev_database.db" (
    echo Deleting existing dev_database.db
    del dev_database.db
) else (
    echo No existing dev_database.db found
)

where uvicorn
if %errorlevel% equ 0 (
    start "Backend Server" cmd /k "uvicorn main:app --reload --host 0.0.0.0"
) else (
    start "Backend Server" cmd /k "python -m uvicorn main:app --reload --host 0.0.0.0"
)

REM Populate database with dataloader
echo Populating database with dataloader
if exist "dataloader.py" (
    python dataloader.py
) else (
    echo No dataloader.py found
)

@REM REM ### FRONTEND ###

@REM cd ../../frontend

@REM REM Check if Node.js is installed
@REM where node
@REM if %errorlevel% neq 0 (
@REM     echo Node.js is not installed
@REM     exit /b 1
@REM )

@REM REM Install frontend dependencies if package.json exists
@REM if exist "package.json" (
@REM     echo Installing frontend dependencies
@REM     call npm install
@REM     if %errorlevel% neq 0 (
@REM         echo Failed to install frontend dependencies
@REM         exit /b 1
@REM     )
@REM )

@REM REM Start the frontend
@REM echo Starting frontend development server
@REM start "Frontend Server" cmd /c "npm run start"

@REM REM ### MOCKPOS ###

@REM cd ../MockPOS

@REM REM Start the POS server
@REM cd app
@REM start "POS Server" cmd /c "python -m uvicorn server:app --host 0.0.0.0 --reload --port 8001"

@REM REM Install POS CLI dependencies if package.json exists
@REM cd ../interface

@REM if exist "package.json" (
@REM     echo Installing POS CLI dependencies
@REM     call npm install
@REM     if %errorlevel% neq 0 (
@REM         echo Failed to install POS CLI dependencies
@REM         exit /b 1
@REM     )
@REM )

@REM start "POS CLI" cmd /c "npm run build && npm run start"