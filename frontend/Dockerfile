FROM node:18-alpine

WORKDIR /app

# 1. Instala dependências de compilação
RUN apk add --no-cache python3 make g++

# 2. Atualiza npm para a última versão COMPATÍVEL
RUN npm install -g npm@10.8.2

# 3. Instalação à prova de falhas
COPY package.json .
RUN npm install vite@6.3.1 --save-dev --force && \
    npm install --force --legacy-peer-deps

# 4. Copia o resto da aplicação
COPY . .

# 5. Verificação final
RUN npx vite --version

EXPOSE 5173
CMD ["npm", "run", "dev"]