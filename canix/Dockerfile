# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all the application files to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3001

# Define environment variable
ARG REACT_APP_API_URL=http://localhost:3000/api/v1
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Run npm start when the container launches
CMD ["npm", "start"]
