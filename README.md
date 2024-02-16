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

## Notes and Assumptions

I ended up structuring things in a fairly simple way, with some basic error handling and performance optimizations with the use of the activerecord-import gem.

I ended up doing my aggregate calculations on the frontend. I added a note about adding pagination in the future. That may have been something that was worth it to add, but with time adding up largely due to having to familiarize myself with rails, building the app up for scratch, and spending a while on a dockerized implementation, it seemed a bit out of scope for the time I was able to commit. The same would be true of tests, which I would have liked to have added.

A few assumptions include that:
- the units will only be kilograms / kg, grams /g, or pounds / lbs
- the number of products for the purposes of this iteration will be relatively small (so there is no need for massive performance improvements or pagination)
- the product_ids will be unique
- the system should be idempotent such that the data on the webpage / in the system will appear the same if the same CSV was uploaded mulitple times
