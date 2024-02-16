# Canix Import Application

This is a brief guide on how to run the application on a Mac.

## Prerequisites

Before you can run the application, you need to have the following installed:

- Docker: You can download it from [Docker's website](https://www.docker.com/products/docker-desktop).
- Docker Compose: This comes with Docker Desktop for Mac.

## Running the Application

1. Open Terminal.

2. Navigate to the directory containing the application:

    ```bash
    cd /path/to/your/application
    ```

3. Build the Docker images:

    ```bash
    docker-compose build
    ```

4. Start the application:

    ```bash
    docker-compose up
    ```

Your application should now be running. The frontend is accessible at `http://localhost:3001`, and the backend at `http://localhost:3000`.

## Stopping the Application

To stop the application, press `Ctrl+C` in the Terminal where you ran `docker-compose up`.

You can also stop the application by running the following command in another Terminal:

```bash
docker-compose down