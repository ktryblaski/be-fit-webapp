ARG NODE_VERSION
ARG NGINX_VERSION

# BUILD
FROM node:$NODE_VERSION AS build

RUN npm install --unsafe-perm -g @angular/cli

RUN mkdir /code
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm --unsafe-perm install;

COPY . .
RUN ng build --prod;

# RUN
FROM nginx:$NGINX_VERSION

RUN rm -rf /usr/share/nginx/html/*
COPY docker/image/default.conf /etc/nginx/conf.d/
COPY --from=build /code/dist/be-fit /usr/share/nginx/html
