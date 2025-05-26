FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY backend/package*.json ./

RUN npm install --omit=dev

COPY backend/ .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]