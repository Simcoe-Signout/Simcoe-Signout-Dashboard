# build stage
FROM node:16 AS build-stage

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

# production stage
FROM nginx AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
