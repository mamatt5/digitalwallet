#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "### BACKEND ###"

# Change to the backend directory
cd Backend

# Check for a virtual environment
if [ -d "venv" ]; then
    echo "Activating virtual environment"
    source venv/bin/activate
else
    echo "No virtual environment found"
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed"
    exit 1
fi

# Install backend dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing backend dependencies from requirements.txt"
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "Failed to install backend dependencies"
        exit 1
    fi
fi

# Start the backend
echo "Starting backend server"
cd app

# Check if dev_database.db exists and delete it
if [ -f "dev_database.db" ]; then
    echo "Deleting existing dev_database.db"
    rm dev_database.db
else
    echo "No existing dev_database.db found"
fi

if command -v uvicorn &> /dev/null; then
    uvicorn main:app --reload --host 0.0.0.0 &
else
    python3 -m uvicorn main:app --reload --host 0.0.0.0 &
fi

# Populate database with dataloader
echo "Populating database with dataloader"
if [ -f "dataloader.py" ]; then
    python3 dataloader.py
else
    echo "No dataloader.py found"
fi

echo "### FRONTEND ###"

cd ../../frontend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed"
    exit 1
fi

# Install frontend dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "Installing frontend dependencies"
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install frontend dependencies"
        exit 1
    fi
fi

# Start the frontend
echo "Starting frontend development server"
npm run start &

echo "### MOCKPOS ###"

cd ../MockPOS

# Start the POS server
cd app
python3 -m uvicorn server:app --host 0.0.0.0 --reload --port 8001 &

# Install POS CLI dependencies if package.json exists
cd ../interface

if [ -f "package.json" ]; then
    echo "Installing POS CLI dependencies"
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install POS CLI dependencies"
        exit 1
    fi
fi

npm run build && npm run start &