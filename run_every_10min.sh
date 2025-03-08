#!/bin/bash

# This script runs the rename_files_unix.sh script every 10 minutes
# It can be started manually and will continue running until terminated

# Define the path to the script we want to run
SCRIPT_TO_RUN="/home/uriel/Documents/GitHub/mimi/rename_files_unix.sh"

# Check if the script exists and is executable
if [ ! -f "$SCRIPT_TO_RUN" ]; then
    echo "Error: Script $SCRIPT_TO_RUN not found!"
    exit 1
fi

if [ ! -x "$SCRIPT_TO_RUN" ]; then
    echo "Making script executable..."
    chmod +x "$SCRIPT_TO_RUN"
fi

echo "Starting runner script to execute $(basename $SCRIPT_TO_RUN) every 10 minutes"
echo "Press Ctrl+C to stop the execution"
echo "Started at: $(date)"
echo "----------------------------------------"

# Infinite loop to run the script every 10 minutes
while true; do
    echo "Running $(basename $SCRIPT_TO_RUN) at: $(date)"
    
    # Execute the script
    $SCRIPT_TO_RUN
    
    echo "----------------------------------------"
    echo "Sleeping for 10 minutes before next execution..."
    echo "Next execution will be at approximately: $(date -d '10 minutes')"
    echo "----------------------------------------"
    
    # Wait for 10 minutes (600 seconds)
    sleep 600
done
