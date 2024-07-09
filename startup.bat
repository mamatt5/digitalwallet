@echo on

REM ### BACKEND ###

REM Change to the backend directory
cd Backend

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
python dataloader.py
python dataloader.py
if exist "dataloader.py" (
    python dataloader.py
) else (
    echo No dataloader.py found
)


@REM REM ### ANALYTICS WEBSITE ###

cd ../../AnalyticsWebsite

REM Install dependencies if package.json exists
if exist "package.json" (
    echo Installing frontend dependencies
    where pnpm
    if %errorlevel% neq 0 (
        call npm install
        if %errorlevel% neq 0 (
            echo Failed to install frontend dependencies
            exit /b 1
        )
        start "PayPath Companion" cmd /c "npm run dev"
    ) else (
        call pnpm install
        if %errorlevel% neq 0 (
            echo Failed to install frontend dependencies
            exit /b 1
        )
        start "PayPath Companion" cmd /c "pnpm run dev"
    )
)

@REM REM ### ECOMMERCE WEBSITE ###

cd ../EcommerceDemoQRCode

REM Install dependencies if package.json exists
if exist "package.json" (
    echo Installing frontend dependencies
    where pnpm
    if %errorlevel% neq 0 (
        call npm install
        if %errorlevel% neq 0 (
            echo Failed to install frontend dependencies
            exit /b 1
        )
        start "Lora's Cafe Specialty Store" cmd /c "npm run dev"
    ) else (
        call pnpm install
        if %errorlevel% neq 0 (
            echo Failed to install frontend dependencies
            exit /b 1
        )
        start "Lora's Cafe Specialty Store" cmd /c "pnpm run dev"
    )
)

@REM REM ### MOBILE APP FRONTEND ###

cd ../frontend

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

REM ### MOCKPOS ###


REM ### MOCKPOS ###

cd ../MockPOS

REM Start the POS server
cd app
start "POS Server" cmd /c "python -m uvicorn server:app --host 0.0.0.0 --reload --port 8001"

REM Install POS CLI dependencies if package.json exists
cd ../interface

if exist "package.json" (
    echo Installing POS CLI dependencies
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install POS CLI dependencies
        exit /b 1
    )
)

start "POS CLI" cmd /c "npm run build && npm run start"

REM ## ANALYTICS ##

cd ../../AnalyticsWebsite
call npm install

REM Start the React Vite
start "Analytics Website" cmd /c "npm run dev"
timeout /t 5
start http://localhost:5173/
