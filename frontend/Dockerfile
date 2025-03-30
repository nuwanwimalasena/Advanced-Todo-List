# Step 1: Build Stage (for development & production)
FROM node:22 AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Step 2: Development Stage (for running in development mode)
FROM node:22 AS development

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the development port (default for Vite is 5173)
EXPOSE 5173

# Run Vite in development mode
CMD ["npm", "run", "dev"]

# Step 3: Production Stage
FROM node:22 AS production

# Set working directory
WORKDIR /usr/src/app

# Only copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the build files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the production port (default for Vite is 5173)
EXPOSE 5173

# Start the Vite server in production mode
CMD ["npm", "run", "preview"]
