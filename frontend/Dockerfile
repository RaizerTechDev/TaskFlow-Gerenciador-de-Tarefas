FROM node:18-alpine

WORKDIR /app

# Instala dependências necessárias para alguns pacotes npm
RUN apk add --no-cache python3 make g++

# Instala a versão estável do npm
RUN npm install -g npm@10.8.2

# Copia os arquivos de dependência primeiro
COPY package.json .

# Instala as dependências do projeto
RUN npm install vite@6.3.1 --save-dev --force && \
    npm install --force --legacy-peer-deps

# Copia todo o código fonte
COPY . .

# O ponto crítico: Use CMD em vez de RUN para manter o processo ativo
CMD ["npm", "run", "dev"]