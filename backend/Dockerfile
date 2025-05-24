FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY . .


EXPOSE 5000

CMD ["node", "src/server.js"]