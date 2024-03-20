# Stage 1: Build the Node.js application
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Stage 2: Set up PostgreSQL
FROM postgres:latest AS postgres

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=ujjwal
ENV POSTGRES_PASSWORD=atreya
ENV POSTGRES_DB=musical

# Stage 3: Final image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built application code from the previous stage
COPY --from=builder /usr/src/app .

# Expose the port that your app runs on
EXPOSE 3000

# Command to run your Node.js application
CMD ["npm", "start"]
