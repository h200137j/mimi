#!/bin/bash

# Script to rename files in the Michelle folder with random numbers from 1 to 742
# while preserving their original file extensions

# Error handling
set -e

# Check if Michelle directory exists
if [ ! -d "Michelle" ]; then
    echo "Error: Michelle directory not found!"
    exit 1
fi

# Count files to ensure we have the right number
file_count=$(find Michelle -type f | wc -l)
echo "Found $file_count files in Michelle directory."

if [ $file_count -ne 742 ]; then
    echo "Warning: Found $file_count files, but expected 742."
    read -p "Continue anyway? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Operation aborted."
        exit 0
    fi
fi

# Create temporary directory for the operation
temp_dir=$(mktemp -d)
echo "Created temporary directory: $temp_dir"

# Clean up function that runs on exit
cleanup() {
    echo "Cleaning up temporary directory..."
    rm -rf "$temp_dir"
}

# Register the cleanup function to run on script exit
trap cleanup EXIT

# Generate shuffled numbers from 1 to 742
echo "Generating and shuffling numbers..."
seq 1 742 | shuf > "$temp_dir/shuffled_numbers.txt"

# Create a directory for the renamed files
mkdir -p "$temp_dir/renamed"

# Get list of files to rename
find Michelle -type f > "$temp_dir/file_list.txt"

# Count for progress tracking
total_files=$(wc -l < "$temp_dir/file_list.txt")
counter=0

echo "Starting file renaming process..."
# Read each file and assign a shuffled number
paste "$temp_dir/file_list.txt" "$temp_dir/shuffled_numbers.txt" | while read file number; do
    # Extract file extension
    extension="${file##*.}"
    
    # Create new filename
    new_name="$number.$extension"
    
    # Increment counter and show progress
    counter=$((counter + 1))
    echo -ne "Renaming files: $counter/$total_files\r"
    
    # Copy the file to the temporary directory with new name
    cp "$file" "$temp_dir/renamed/$new_name"
done

echo -e "\nVerifying file count..."
renamed_count=$(find "$temp_dir/renamed" -type f | wc -l)
if [ $renamed_count -ne $total_files ]; then
    echo "Error: Something went wrong during renaming. Expected $total_files files but got $renamed_count."
    echo "Aborting operation."
    exit 1
fi

echo "Moving renamed files to Michelle directory..."
# Create backup of original Michelle directory
timestamp=$(date +%Y%m%d_%H%M%S)
echo "Creating backup of original files as Michelle_backup_$timestamp"
cp -r Michelle "Michelle_backup_$timestamp"

# Replace files in Michelle directory with renamed files
rm -f Michelle/*
cp "$temp_dir/renamed"/* Michelle/

echo "Successfully renamed $renamed_count files in Michelle directory!"
echo "Files are now named from 1.$extension to $total_files.$extension in random order."
echo "Original files are backed up in Michelle_backup_$timestamp/"

