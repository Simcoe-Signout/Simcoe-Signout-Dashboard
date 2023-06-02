#!/bin/bash

# Detect the operating system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Check if Ubuntu or PopOs
    if [ -f /etc/lsb-release ]; then
        . /etc/lsb-release
        if [[ $DISTRIB_ID == "Ubuntu" || $DISTRIB_ID == "Pop" ]]; then
            OS="ubuntu"
        fi
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    OS="macos"
fi

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    if [ "$OS" == "ubuntu" ]; then
        # Ubuntu/PopOs installation
        sudo apt update && sudo apt install -y docker.io
        sudo systemctl enable docker
        sudo systemctl start docker
    elif [ "$OS" == "macos" ]; then
        # macOS installation
        brew install docker
        open /Applications/Docker.app
    else
        echo "Unsupported operating system. Please install Docker manually."
        exit 1
    fi
else
    echo "Docker is already installed."
fi

# Install docker-compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    if [ "$OS" == "ubuntu" ]; then
        # Ubuntu/PopOs installation
        sudo apt install -y docker-compose
    elif [ "$OS" == "macos" ]; then
        # macOS installation
        brew install docker-compose
    else
        echo "Unsupported operating system. Please install Docker Compose manually."
        exit 1
    fi
else
    echo "Docker Compose is already installed."
fi

env_file=".env"
example_file="env.example"

# Check if .env file already exists
if [ -f "$env_file" ]; then
    echo ".env file already exists."
else
    # Copy .env from env.example
    if [ -f "$example_file" ]; then
        cp "$example_file" "$env_file"
        echo "Copied $example_file to $env_file."
    else
        echo "$example_file not found. Cannot copy .env file."
        exit 1
    fi
fi