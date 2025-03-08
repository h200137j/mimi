#!/bin/bash

# This script sets up a cron job to run rename_files_unix.sh every 10 minutes

# Define the path to the script we want to run
SCRIPT_TO_RUN="/home/uriel/Documents/GitHub/mimi/rename_files_unix.sh"

# Check if the script exists
if [ ! -f "$SCRIPT_TO_RUN" ]; then
    echo "Error: Script $SCRIPT_TO_RUN not found!"
    exit 1
fi

# Make the script executable if it isn't already
if [ ! -x "$SCRIPT_TO_RUN" ]; then
    echo "Making script executable..."
    chmod +x "$SCRIPT_TO_RUN"
fi

# Create a temporary file to hold the current crontab
TEMP_CRON=$(mktemp)
crontab -l > "$TEMP_CRON" 2>/dev/null

# Check if the job is already in the crontab
if grep -q "$SCRIPT_TO_RUN" "$TEMP_CRON"; then
    echo "Cron job already exists. No changes made."
    rm "$TEMP_CRON"
    exit 0
fi

# Add the new cron job to run every 10 minutes
echo "*/10 * * * * $SCRIPT_TO_RUN >> /home/uriel/Documents/GitHub/mimi/rename_log_\$(date +\%Y\%m\%d).log 2>&1" >> "$TEMP_CRON"

# Install the new crontab
crontab "$TEMP_CRON"
rm "$TEMP_CRON"

echo "Cron job added successfully."
echo "The script $SCRIPT_TO_RUN will run every 10 minutes."
echo "Logs will be written to /home/uriel/Documents/GitHub/mimi/rename_log_YYYYMMDD.log"
echo "You can verify the cron job with: crontab -l"
