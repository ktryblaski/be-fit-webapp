ARG NODE_VERSION
ARG NGINX_VERSION

# BUILD
FROM node:$NODE_VERSION AS build

RUN mkdir /code
WORKDIR /code

RUN npm i --unsafe-perm -g @angular/cli

COPY package.json package-lock.json ./
RUN npm i --unsafe-perm

COPY . .
#RUN npm run lint && npm run test && npm run build:prod
RUN npm run lint && npm run build:prod

# RUN
FROM nginx:$NGINX_VERSION

RUN rm -rf /usr/share/nginx/html/*
COPY docker/remote/default.conf /etc/nginx/conf.d/

#RUN adduser -D befit befit
#USER befit
#WORKDIR /home/befit

COPY --from=build /code/dist/be-fit /usr/share/nginx/html
