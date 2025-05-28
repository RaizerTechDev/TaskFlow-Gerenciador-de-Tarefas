# Estrutura de Arquivos do Backend

backend/
├── src/
│   ├── config/
│   │   └── db.config.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── tasks.controller.js
│   ├── middlewares/
│   │   ├── auth.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
Estrutura de Arquivos do Docker│   ├── utils/
│   │   └── errorHandler.js
│   ├── app.js
│   └── server.js
├── .dockerignore
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── Dockerfile
├── package.json
└── package-lock.json

--------------------

frontend/
├── public/

│   ├── img-soluction.gif/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── auth.js
│   │   └── axios.js
│   │   └── tasks.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── index.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├─  TaskItem.jsx 
│   │   │   ├── TaskList.jsx
│   │   ├── Home.jsx
│   │   ├── NoFound.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
├── styles/
│   └── index.css
├── vscode/
│   └── setting
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
└── postcss.config.js

------------------

# Estrutura de Arquivo do Docker

docker/
├── docker-compose.yml/
