# base image
FROM node:20.2.0

# Import our BUILD_USER from any env file, default to app
ENV APP_ROOT /var/www/dsbnbooking.com
ENV BUILD_USER="app"
ARG BUILD_USER="$BUILD_USER"
ENV NODE_ENV="production"
ARG NODE_ENV="$NODE_ENV"

RUN \
  adduser --disabled-password --gecos '' $BUILD_USER && \
  mkdir -p $APP_ROOT && \
  chown -R $BUILD_USER:$BUILD_USER ${APP_ROOT}

# Switch to a non privalged user to install packages
USER $BUILD_USER
WORKDIR $APP_ROOT

# copy package.json and package-lock.json separately
COPY --chown=${BUILD_USER}:${BUILD_USER} package* $APP_ROOT

# install dependencies
RUN yarn install --frozen-lockfile --production=false

# copy the rest of the application
COPY --chown=${BUILD_USER}:${BUILD_USER} . $APP_ROOT

USER root

# start app
CMD ["yarn", "run", "dev"]
