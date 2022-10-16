FROM node:16

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm install

RUN npm run build

WORKDIR /app/backend

RUN npm install

RUN npm run build

WORKDIR /app/backend/build

RUN npm ci --production

WORKDIR /app/backend

COPY backend/.env.example ./build/.env

WORKDIR /app/backend/build

RUN node ace generate:key

RUN apt-get update

RUN apt-get install traceroute

CMD ["node", "server.js"]