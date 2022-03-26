FROM node:16

WORKDIR /app

COPY . .

WORKDIR /app/backend

RUN npm install

RUN apt-get update

RUN apt-get install traceroute