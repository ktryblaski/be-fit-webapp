# install required packages
FROM node:15.8.0-buster AS pre_build

WORKDIR /code

RUN apt-get update \
    && apt-get install -y \
	    apt-transport-https \
	    ca-certificates \
	    curl \
	    gnupg \
	    --no-install-recommends \
	  && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
	  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
	  && apt-get update \
	  && apt-get install -y \
	    google-chrome-unstable \
	    fontconfig \
	    fonts-ipafont-gothic \
	    fonts-wqy-zenhei \
	    fonts-thai-tlwg \
	    fonts-kacst \
	    fonts-symbola \
	    fonts-noto \
	    fonts-freefont-ttf \
	    --no-install-recommends \
	  && apt-get purge --auto-remove -y curl gnupg \
	  && rm -rf /var/lib/apt/lists/*

# lint, test, build
FROM pre_build AS build

RUN npm i --unsafe-perm -g @angular/cli

COPY package.json package-lock.json ./
RUN npm i --unsafe-perm  && ./node_modules/.bin/ngcc --properties es2015

COPY . .
RUN npm run lint \
    && npm run test:headless \
    && npm run build:prod

# run
FROM nginx:1.19.6-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY docker/remote/default.conf /etc/nginx/conf.d/

#RUN adduser -D befit befit
#USER befit
#WORKDIR /home/befit

COPY --from=build /code/dist/be-fit /usr/share/nginx/html
