#!/bin/bash

# Set variables
PROJECT_DIR="/path/to/your/project"  # Change this to your project directory
BUILD_DIR="$PROJECT_DIR/build"         # Change this if your build output is in a different directory
TAR_FILE="ui.tar.gz"                # Name of the tar file
DOCKER_IMAGE_NAME="raphael/rua:v0.3"  # Change this to your Docker image name

# Navigate to the project directory
cd "$PROJECT_DIR" || { echo "Project directory not found"; exit 1; }

# Step 1: Delete node_modules and old build
echo "Deleting node_modules and old build..."
rm -rf node_modules
rm -rf "$BUILD_DIR"

# Step 2: Install npm packages
echo "Installing npm packages..."
npm install

# Step 3: Build the project
echo "Building the project..."
npm run build

# Step 4: Create a tarball of the build output
echo "Creating tarball of the build output..."
cd "$BUILD_DIR" && tar -czvf "../../$TAR_FILE" -C "$BUILD_DIR" ./