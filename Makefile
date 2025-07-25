# Makefile for ohmyfork project

# Build the Docker image
docker-build:
	docker build -t ohmyfork .

# Run the Docker container
docker-run:
	docker run --rm -p 80:80 ohmyfork

# Stop all running ohmyfork containers
docker-stop:
	docker ps -q --filter ancestor=ohmyfork | xargs -r docker stop

# Remove the Docker image
docker-clean:
	docker rmi ohmyfork || true

# Build locally (not in Docker)
build:
	npm ci
	npm run build

# Clean local build
clean:
	rm -rf dist

.PHONY: docker-build docker-run docker-stop docker-clean build clean
