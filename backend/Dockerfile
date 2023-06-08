# Use the official Ruby image as the base image
FROM ruby:3.0.6

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    yarn \
    libpq-dev

# Copy the Gemfile and Gemfile.lock into the container
COPY Gemfile Gemfile.lock ./

# Install project dependencies
RUN gem install bundler && bundle install --jobs 20 --retry 5

# Copy the application code into the container
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Start the Rails server when the container launches
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
