
# Michelle's Gallery Script Runner

This directory contains scripts to automatically rename and shuffle image files in the Michelle directory.

## Available Methods for Running Scripts Periodically

There are two methods available to run the renaming script every 10 minutes:

### Method 1: Using the Runner Script (Foreground Process)

1. Make the runner script executable:
   ```bash
   chmod +x run_every_10min.sh
   ```

2. Run the script in a terminal:
   ```bash
   ./run_every_10min.sh
   ```

3. The script will continue running until you press Ctrl+C to stop it.
   - This method requires keeping the terminal open.
   - It will print output directly to the terminal.

### Method 2: Using Cron (Background Process)

1. Make the cron setup script executable:
   ```bash
   chmod +x setup_cron.sh
   ```

2. Run the setup script:
   ```bash
   ./setup_cron.sh
   ```

3. The script will set up a cron job that will run every 10 minutes in the background.
   - This method doesn't require keeping a terminal open.
   - Logs will be saved to a file named `rename_log_YYYYMMDD.log` in this directory.
   - You can view the logs with: `cat rename_log_$(date +%Y%m%d).log`

4. To verify that the cron job is set up correctly:
   ```bash
   crontab -l
   ```

5. To remove the cron job if needed:
   ```bash
   crontab -e
   ```
   Then delete the line containing `rename_files_unix.sh` and save.

## File Details

- `rename_files_unix.sh`: The main script that renames and shuffles image files.
- `run_every_10min.sh`: A script that runs `rename_files_unix.sh` every 10 minutes in a terminal.
- `setup_cron.sh`: A script that sets up a cron job to run `rename_files_unix.sh` every 10 minutes.

## Notes

- Both methods will randomize the order of images in the Michelle directory.
- A backup of the original files is created before renaming.
- The script ensures all file extensions are preserved.
