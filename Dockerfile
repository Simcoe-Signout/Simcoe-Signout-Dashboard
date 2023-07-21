# Stage 1: Install dependencies and build the Vite project
FROM node:16 as builder

# Set the working directory inside the container
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

# Set the working directory inside the Nginx container
WORKDIR /usr/share/nginx/html

# Copy the built files from the builder stage to the Nginx container
COPY --from=builder /dist .

# (Optional) If you need to provide a custom nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]