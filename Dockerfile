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

CMD ["node", "server.js"]