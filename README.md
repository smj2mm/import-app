# Project Setup and Run Instructions

This guide assumes that you have Ruby, Rails, Node.js, and PostgreSQL installed on your Mac. If not, please install them first.

## Backend Setup

1. Navigate to the project directory (this directory)

2. Install the required Ruby gems:

    ```bash
    bundle install
    ```

3. Set up the environment variables. You can do this by creating a `.env` file in the root of your project with the following content:

    ```bash
    RAILS_ENV=development
    POSTGRES_DB=your_database_name
    POSTGRES_USER=your_postgres_username
    POSTGRES_PASSWORD=your_postgres_password
    RAILS_MASTER_KEY=your_master_key
    ```

4. Create the database:

    ```bash
    rails db:create
    ```

5. Run the database migrations:

    ```bash
    rails db:migrate
    ```

6. Start the Rails server:

    ```bash
    rails s
    ```

The backend server will start running at `http://localhost:3000`.

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd /path/to/your/project/frontend
    ```

2. Install the required Node.js packages:

    ```bash
    npm install
    ```

3. Set up the environment variables. You can do this by creating a `.env` file in the root of your frontend project with the following content:

    ```bash
    REACT_APP_API_URL=http://localhost:3000/api/v1
    ```

4. Start the React server:

    ```bash
    npm start
    ```

The frontend server will start running at `http://localhost:3001`.

Now, you should be able to access the application in your web browser at `http://localhost:3001`.
