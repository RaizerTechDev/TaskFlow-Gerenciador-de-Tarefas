 <div align="center">

# TASK MANAGER APPLICATION

 <div align="center">

<img src="frontend/public/doc.png" alt="Imagem-Documentacao" height="35" />

[![Documentação](https://img.shields.io/badge/Documentação-Oficial-success)](https://github.com/RaizerTechDev/projeto-raizer-digital-solutions/blob/master/Documentation.md)

[( Clique aqui para se `Cadastar` e criar suas `Tasks`)](/)

<br>
  
<img src= "https://media.giphy.com/media/3zSF3Gnr7cxMbi6WoP/giphy.gif" align="center" height="55" width="55"> [Demonstração-Projeto-RaizerTech] <img src= "https://media.giphy.com/media/E5DzZsofmgxc9wjbhX/giphy.gif" align="center" height="25" width="25">

<img height="380em" src="frontend/public/readme-video.gif"   align="center">

<br>

---

## 📑 Índice
<div align="left">

- [Objetivo](#objetivo)
- [Tecnologias](#tecnologias)
- [Configuração e Instalação](#configuração-e-instalação-do-ambiente)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#-instalação) 
- [Documentação da API](#-documentação-da-api)
- [Execução](#-execução)
- [Banco de Dados](#acessar-o-banco-de-dados)
- [Frontend](#️-frontend)
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
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens)

### Frontend
![React](https://img.shields.io/badge/-React-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwind-css)

### DevOps
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker)
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman)

<br>

---

## 🛠️Configuração e Instalação

### Pré-requisitos
- Node.js v18+
- Docker v20+
- PostgreSQL 15

### 📦 Instalação


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

#### Dependências Backend + Frontend
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

## 🚀 Execução

<br>


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
docker-compose -f docker/docker-compose.yml down
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

### Acessar o banco de dados
```bash
docker exec -it docker-postgres-1 psql -U postgres -d taskmanager
```

<br>

### Comandos úteis no PostgreSQL
```sql
-- Listar todas as tabelas
\dt

-- Descrever estrutura da tabela Tasks
\d "Tasks"

-- Consultar dados da tabela Tasks
SELECT * FROM "Tasks";

-- Consultar dados da tabela Tasks por "userId" e verificar "status"
SELECT * FROM "Tasks" ORDER BY "userId" ;

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


