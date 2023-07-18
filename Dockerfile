# Stage 1: Install dependencies and build the Vite project
FROM node:14 as builder

WORKDIR /

# Copy the package.json and package-lock.json (or yarn.lock) files first to leverage Docker cache
COPY package*.json ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Vite project for production
RUN yarn build

# Stage 2: Serve the production build using a lightweight HTTP server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /dist /usr/share/nginx/html

# (Optional) If you need to provide a custom nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to access the application
EXPOSE 80

# Start the nginx server when the container runs
CMD ["nginx", "-g", "daemon off;"]
