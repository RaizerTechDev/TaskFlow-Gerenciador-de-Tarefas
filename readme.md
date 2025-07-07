 <div align="center">

# TASK MANAGER APPLICATION

 <div align="center">

<img src="frontend/public/doc.png" alt="Imagem-Documentacao" height="35" />

[![Documentação](https://img.shields.io/badge/Documentação-Oficial-success)](https://github.com/RaizerTechDev/TaskFlow-Gerenciador-de-Tarefas/blob/master/Documentation.md)

[( Clique aqui para se `Cadastar` e criar suas `Tasks`)](https://task-flow-gerenciador-de-tarefas-frontend.vercel.app/)

<br>
  
<img src= "https://media.giphy.com/media/3zSF3Gnr7cxMbi6WoP/giphy.gif" align="center" height="55" width="55"> [Demonstração-Projeto-RaizerTech] <img src= "https://media.giphy.com/media/E5DzZsofmgxc9wjbhX/giphy.gif" align="center" height="25" width="25">

<img height="380em" src="frontend/public/Readme-Demonstracao-Video.gif"   align="center">

<br>

---

## 📑 Índice
<div align="left">
 
- [TASK MANAGER APPLICATION](#task-manager-application)
- [Objetivo](#objetivo)
- [Tecnologias](#tecnologias)
- [Documentação da API](#-documentação-da-api)
- [Configuração e Instalação dos Ambientes](#️configuração-e-instalação-dos-ambientes)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação FrontEnd](#-instalação-frontend)
  - [Instalação Backend](#-instalação-backend) 
  - [Instalação Docker](#-instalação-do-docker)  
- [Execução](#-execução)
- [Banco de Dados](#️-banco-de-dados-postgresql)
- [Frontend](#️-frontend)
- [Implentações de Branches](#implementações-de-branches)
- [Licença](#licença)
- [Autor](#-autor)

---

<div align="left">

## 🎯Objetivo

Um aplicativo completo de gerenciamento de tarefas com backend (Node.js/Express), frontend (React) e banco de dados PostgreSQL, tudo containerizado com Docker.

<br>

---

## 🚀Tecnologias

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
![Express](https://img.shields.io/badge/-Express-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=black)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens)

### Frontend
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=black)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwind-css&logoColor=black)

### DevOps
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=black)
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=black)


<br>

---

## 📚 Documentação da API
[Run in Postman](https://documenter.getpostman.com/view/19569624/2sB2qWH4Yv)

Endpoints principais:

POST /api/auth/register - Registro de usuário

POST /api/auth/login - Autenticação

GET /api/tasks - Listar tarefas

POST /api/tasks - Criar tarefa

PUT /api/tasks/:id - Atualizar tarefa

<br>

---

## 🛠️Configuração e Instalação dos Ambientes

### Pré-requisitos
- Node.js v18+
- Docker v20+
- PostgreSQL 15

### 📦 Instalação FrontEnd

#### Criar projeto React com Vite
```bash
npm create vite@latest . -- --template react
```

<br>

#### Dependências principais
```bash
npm install axios react-router-dom react-icons react-toastify @heroicons/react date-fns
```

<br>

#### Dependências de desenvolvimento (TailwindCSS)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

<br>

### 📦 Instalação BackEnd

#### Dependências principais
```bash
npm install express express-async-handler cors dotenv bcryptjs jest jsonwebtoken nodemon sequelize 
```

### 🐋 Instalação do Docker

Antes de executar os serviços, é necessário ter o Docker instalado. Siga as instruções de acordo com seu sistema operacional:

#### Para Windows/macOS (Docker Desktop):

- Baixe o Docker Desktop
🔗 [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

- Recomendado para desenvolvimento local.

- Instale e Inicie

- Execute o instalador baixado

- Inicie o Docker Desktop após a instalação

- Aguarde até que o ícone do Docker na bandeja/barra de menus indique que está em execução (⏳→🐳)

#### Para Linux (Docker Engine):

```bash
1. Atualize os pacotes
sudo apt-get update

2. Instale dependências
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

3. Adicione o repositório oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

4. Instale o Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

5. Adicione seu usuário ao grupo docker (evita usar sudo)
sudo usermod -aG docker $USER
newgrp docker  # Recarrega as permissões (ou reinicie o terminal)
de teste
```

#### Verifique a Instalação
bash
docker --version           # Deve mostrar a versão instalada
docker run hello-world     # Executa um contêiner 

<br>

---


#### Dependências Backend + Frontend + Docker
```bash
npm install
```

<br>

#### Listar dependências instaladas
```bash
npm list
```

<br>

---

## 🚀 Execução

### Iniciar todos os serviços (Docker)

```bash
docker-compose -f docker/docker-compose.yml up --build
```

- Portas:
  - Backend: 5000

  - Frontend: 5173

  - Postgres: 5432

<br>

### Parar todos os serviços
```bash
docker-compose -f docker/docker-compose.yml down -v
```

<br>

### Limpeza de recursos Docker

- Limpar recursos não utilizados
```bash
# Limpar recursos não utilizados
docker system prune -a

# Remover volumes não utilizados
docker volume prune
```

<br>

---

## 🗄️ Banco de Dados (PostgreSQL)

### Acessar o banco de dados ```localhost```
```bash
docker exec -it docker-postgres-1 psql -U postgres -d taskmanager
```

### Acessar o banco de dados no ```Render```
```bash
psql "postgres://[usuário]:[senha]@[host]:[porta]/[nome_do_banco]?sslmode=require"
```

<br>

### Comandos úteis no PostgreSQL
```sql
-- Listar todas as tabelas
\dt

-- Descrever estrutura da tabela Tasks
\d "Tasks"

-- Consultar dados da tabela Tasks
SELECT * FROMs "Task";

-- Consultar dados da tabela Tasks por "userId" e verificar "status"
SELECT * FROM "Tasks" ORDER BY "userId" ;

-- Consultar dados da tabela Tasks por "userId" e verificar "status"
SELECT t.* FROM "Tasks" t   JOIN "Users" u ON t."userId" = u.id  WHERE u.id = 4  ORDER BY t."status";

-- Exemplo: Renomear coluna
ALTER TABLE "Tasks" RENAME COLUMN "dueDate" TO "taskDate";

-- Verificar alterações
\d "Tasks"
```

<br>

---

## 🖥️ Frontend

### Build de produção
```bash
npm run build
```

### Desenvolvimento FrontEnd
```bash
npm run dev
```

- Portas:
  - Frontend: 5180

<br>

---

## Implementações de branches

1. Desenvolvimento Front-End  
  - [release/desenvolvimento-front-end](https://github.com/RaizerTechDev/TaskFlow-Gerenciador-de-Tarefas/tree/release/frontend/frontend)
  
2. Desenvolvimento Back-End 
- [release/desenvolvimento-back-end](https://github.com/RaizerTechDev/TaskFlow-Gerenciador-de-Tarefas/tree/master/backend) 

br>

---

## Licença

- Esse projeto está sob a licença MIT.

<br>

---

##### 👤 Autor

<p>
    <img align=left margin=10 width=80 src="https://avatars.githubusercontent.com/u/87991807?v=4"/>
    <p>&nbsp&nbsp&nbspRafaRaizer-Dev<br>
    &nbsp&nbsp&nbsp<a href="https://api.whatsapp.com/send/?phone=47999327137">Whatsapp</a>&nbsp;|&nbsp;<a href="https://www.linkedin.com/in/rafael-raizer//">LinkedIn</a>&nbsp;|&nbsp;<a href="https://github.com/RaizerTechDev">GitHub</a>|&nbsp;<a href="https://public.tableau.com/app/profile/rafael.raizer">Tableau</a>|&nbsp;<a href="https://raizertechdev-portfolio.netlify.app/">Portfólio</a>&nbsp;</p>
</p>


