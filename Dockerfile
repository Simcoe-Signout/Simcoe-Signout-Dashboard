FROM node

WORKDIR /app

# Copy package.json and yarn.lock files first for caching
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your Vite app will run on
EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "run", "dev"]
