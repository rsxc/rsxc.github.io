# Use the official Bun image
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest as base

# Set working directory
WORKDIR /app

# Add the rest of the app's source code
COPY . ./

RUN bun install

ENV PATH /app/node_modules/.bin:$PATH

# Build the application
RUN bun run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=base /app/build /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Launch nginx
CMD ["nginx", "-g", "daemon off;"]