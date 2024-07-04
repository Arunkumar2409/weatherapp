# Define the shell to use
SHELL := /bin/bash

# Define your variables
PORT := 3000

# Default target
all: install start

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start the server
start:
	@echo "Starting the server..."
	npm start

# Run the server in development mode
dev:
	@echo "Starting the server in development mode..."
	npm run dev

# Run tests (if you have tests set up)
test:
	@echo "Running tests..."
	npm test

# Clean the node_modules directory
clean:
	@echo "Cleaning up..."
	rm -rf node_modules

# Restart the server (useful for development)
restart: clean install start

.PHONY: all install start dev test clean restart
