# # Stage 1: Install dependencies and build the Vite project
# FROM node:16 as builder

# # Set the working directory inside the container
# WORKDIR /

# # Copy the package.json and package-lock.json (or yarn.lock) files first to leverage Docker cache
# COPY package*.json ./
# RUN yarn install

# # Copy the rest of the application code
# COPY . .

# # Build the Vite project for production
# RUN yarn build

# # Stage 2: Serve the production build using a lightweight HTTP server
# FROM nginx:alpine

# # Set the working directory inside the Nginx container
# WORKDIR /usr/share/nginx/html

# # Copy the built files from the builder stage to the Nginx container
# COPY --from=builder /dist .

# # (Optional) If you need to provide a custom nginx configuration
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 to access the application
# EXPOSE 80

# # Start the nginx server when the container runs
# CMD ["nginx", "-g", "daemon off;"]
# build stage
FROM node:16 AS build-stage

WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the Vue.js application
RUN yarn build

# production stage
FROM nginx:latest AS production-stage

# Copy the built files from the build stage to Nginx's default web root directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration that supports client-side routing
COPY nginx/nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]