
# Use the official Node.js 20 image as a base
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Use a smaller, production-focused image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json and index.js
COPY --from=builder /app/package.json ./
COPY --from=builder /app/index.js ./

# Expose the port the app runs on
EXPOSE 4321

# Start the application
CMD ["node", "index.js"]
