# Use the official Bun image as a base image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Run Prisma migrations to ensure the production database is ready
RUN bunx prisma migrate deploy

# Build the Next.js application
RUN bun run build

# Expose port 3000 to the Docker host
EXPOSE 3000

# Start the Next.js server
CMD ["bun", "run", "start"]