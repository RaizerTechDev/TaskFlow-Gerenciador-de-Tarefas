FROM node:18-alpine

WORKDIR /app

# Instala dependências necessárias para build
RUN apk add --no-cache  curl python3 make g++

COPY package*.json ./

# Limpa cache e instala dependências
RUN rm -rf node_modules package-lock.json && \
    npm install --force

COPY . .

# Gera a build de produção
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"] 