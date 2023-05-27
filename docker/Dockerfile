# base image
FROM node:20.2.0

# set working directory
WORKDIR /var/www/dsbnbooking.com

COPY . /var/www/dsbnbooking.com

# install and cache app dependencies\
RUN npm ci

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["npm", "run", "dev"]
