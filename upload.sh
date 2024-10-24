#!/bin/bash

# Set variables
REPO="yourusername/yourrepo"        # Replace with your GitHub repository (username/repo)
TAG_NAME="v0.3"                     # Replace with your release tag
TAR_FILE="ui.tar.gz"             # Name of the tar file created in the build script
DOCKER_IMAGE_NAME="raphpontes/rua:v0.3"  # Change this to your Docker image name

# Step 1: Create a GitHub release
echo "Creating GitHub release..."
gh release create "$TAG_NAME" "$TAR_FILE" --title "$TAG_NAME" --notes "Release $TAG_NAME" --repo "$REPO"

# Step 2: Build and Push Docker Image
echo "Building the Docker image..."
docker build -t "$DOCKER_IMAGE_NAME" .

echo "Pushing the Docker image to Docker Hub..."
docker push "$DOCKER_IMAGE_NAME"

echo "Upload completed successfully."