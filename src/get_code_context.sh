#!/bin/bash

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of directories to look for
directories=("components" "pages" "app" "config" "controllers" "middleware" "models" "routes")

# List of file types to include
include_files=(".js" ".jsx")

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*
  do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      echo "Processing directory: $entry" # Debugging output
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be included
      should_include=false
      for include_pattern in "${include_files[@]}"; do
        if [[ "$entry" == *$include_pattern ]]; then
          should_include=true
          break
        fi
      done

      # If the file type should be included, append its relative path and content to the output file
      if $should_include; then
        relative_path=${entry#"$project_dir/"}
        echo "Including file: $relative_path" # Debugging output
        echo "// File: $relative_path" >> "$output_file"
        cat "$entry" >> "$output_file"
        echo "" >> "$output_file"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    echo "Processing directory: ${dir}" # Debugging output
    read_files "${project_dir}/${dir}"
  else
    echo "Directory not found: ${dir}" # Debugging output
  fi
done

echo "Script execution completed." # Debugging output
