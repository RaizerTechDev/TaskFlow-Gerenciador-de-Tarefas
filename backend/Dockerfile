FROM node:18-alpine

WORKDIR /app

# Instala dependências de compilação apenas para produção
RUN apk add --no-cache python3 make g++

# Copia apenas os arquivos necessários para instalação
COPY backend/package*.json ./

# Instala dependências de produção
RUN npm install --omit=dev

# Copia todo o código do backend
COPY backend/ .

# Configurações finais
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]