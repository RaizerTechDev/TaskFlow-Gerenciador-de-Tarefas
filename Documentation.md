# 📁 Documentação Técnica com Trechos de Código Backend | Frontend | Docker

Este documento descreve um pequeno código da estruturas Backend, Frontend e Docker utilizado no projeto Task-Manager. Abaixo está o índice para facilitar a navegação.

## Índice

1. [ Estrutura Básica Backend](#1-estrutura-básica-backend)
   1.1 [config](#11-config)
     - [db](#dbjs)

   1.2 [controllers](#12-controllers)   
     - [authController](#authcontrollerjs)
     - [taskController](#taskcontrollerjs)

   1.3 [middlewares](#13-middlewares)
     - [auth](#authjs)

   1.4. [models](#14-models)
      - [index](#indexjs)
        
   1.5 [routes](#15-routes)
     - [authRoutes](#authroutesjs)
     - [taskRoutes](#taskhroutesjs)

   1.6. [utils](#16-utils)
     - [erroHandler](#errorhandlerjs) 

   1.7. [app](#17-appjs)        

   <br>

2. [Estrutura Básica Frontend](#2-estrutura-básica-frontend)
   2.1 [api](#21-api)
     - [axios](#axiosjs) 

   2.2 [componentss](#22-components)
     - [Layout](#layoutjsx)
     - [Navbar](#navbarjsx)

   2.3 [contexts](#23-contexts)
     - [AuthContext](#authcontextjsx)
     - [TaskContext](#taskcontextjsx)

   2.4 [pages](#24-pages)
     - [Auth](#aut)
       - [Login](#loginjsx)
       - [Register](#registerjsx)
     - [Dashboard](#dashboard)
       - [index](#indexjsx)  

   2.5 [App](#25-app)
     - [Auth](#aut)   

   2.6 [styles](#26-styles)
     - [index](#indexcss)             
   
   <br>

3. [Estrutura Básica Docker](#3-estrutura-básica-docker)
   3.1 [docker](#31-docker)
     - [docker-compose.yml](#docker-composeyml)
   
   <br>
4. [Conclusão](#4-conclusão)

---

## 1. Estrutura Básica Backend
├── src/
│ ├── config/ # Configurações do banco de dados
│ ├── controllers/ # Lógica dos endpoints
│ ├── middlewares/ # Middlewares de autenticação
│ ├── models/ # Modelos do Sequelize
│ ├── routes/ # Definições de rotas
│ ├── utils/ # Utilitários globais
│ └── app.js # Configuração principal

### 1.1 config

#### db.js

```bash
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;

```

---

### 1.2 controllers

#### authController.js

```bash
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await user.comparePassword(password))) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

```

#### taskController.js

```bash
const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, taskDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "O título é obrigatório" });
    }

    // Verificação reforçada do usuário
    if (!req.user?.id) {
       return res.status(401).json({ message: 'Usuário não identificado' });
  }

    const task = await Task.create({
      title,
      description,
      taskDate,
      userId: req.user.id
    });

    res.status(201).json(task);

    // Buscar a tarefa com dados completos
    const createdTask = await Task.findByPk(task.id, {
      include: [{ model: User, attributes: ['id', 'username'] }]
    });

    res.status(201).json(createdTask);

  } catch (error) {
    console.error('Erro no backend:', error);
    res.status(500).json({ 
      message: error.message || 'Erro interno no servidor' 
    });
  }
});

```

---

### 1.3 middlewares

#### auth.js

```bash
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
   const token = req.headers.authorization?.split(' ')[1] || 
                req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { protect };
```

---

### 1.4 models

#### index.js

```bash
const User = require('./User');
const Task = require('./Task');

module.exports = {
  User,
  Task
};
```
---

### 1.5 routes

#### authRoutes.js

```bash
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  loginUser,
  registerUser,
  getCurrentUser
} = require('../controllers/authController');

console.log({
  loginUser,
  registerUser,
  getCurrentUser
}); 

router.get('/test', (req, res) => {
  res.json({ 
    message: 'Conexão com o backend estabelecida com sucesso!',
    timestamp: new Date().toISOString()
  });
});


// Rotas
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;
```

#### taskhRoutes.js

```bash
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Verifique se todas essas funções estão sendo importadas corretamente
console.log({ getTasks, createTask, updateTask, deleteTask });

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
```

---

### 1.6 utils

#### errorHandler.js

```bash
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
```

### 1.7 app.js

```bash
const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./utils/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5180',
      'http://backend:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Adicionar tratamento para requisições OPTIONS
app.options('*', cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'API Task Manager está funcionando!',
    endpoints: {
      auth: '/api/auth',
      tasks: '/api/tasks',
    },
  });
});

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

---

## 2. Estrutura Básica Frontend

├── src/
│ ├── api/ # Configuração Axios e endpoints
│ ├── assets/ # Arquivos estáticos
│ ├── components/ # Componentes reutilizáveis
│ ├── contexts/ # Contextos globais
│ ├── pages/ # Páginas da aplicação
└── styles/ # Estilos globais

### 2.1 api

#### axios.js

```bash
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config}, 
  error => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Timeout - Servidor demorou para responder';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

### 2.2 components

#### Layout.jsx

```bash
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="relative z-10 pt-16 min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
```

#### Navbar.jsx

```bash
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/" className="text-xl">
          Task Manager <span>🏠</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/login" className="btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn-primary">
          Registrar
        </Link>
      </div>
    </nav>
  )
}
export default Navbar

```

---

### 2.3 contexts

#### AuthContext.jsx

```bash
const AuthContext = createContext()

 const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      localStorage.setItem('token', data.token)
      setUser({ username: data.username, email: data.email })
      navigate('/dashboard')
      return data
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Login failed' }
    }
  }
```

#### TaskContext.jsx

```bash
const TaskContext = createContext()

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasksData = await getTasks();
      setTasks(tasksData.reverse()); // Ordenar do mais novo para mais antigo
    } catch (error) {
      console.error('Error:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [])   
  
    
```

---

### 2.4 pages

#### Aut
##### Login.jsx

```bash
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

    const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    // Limpa erros ao modificar o campo
    setErrors({ ...errors, [e.target.name]: null });
  };
```

###### Register.jsx

```bash
const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()
```

#### Dashboard

##### index.jsx

```bash
const Dashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const { user } = useAuth()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4" >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Olá, {user?.username} 👋
          </h1>
          <p className="text-gray-500 mt-1">Suas tarefas organizadas</p>
        </div>
        <button
          type='button'
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-6 py-2.5 text-sm font-medium rounded-lg transition-all 
          hover:bg-primary/90 transform hover:scale-[1.02] shadow-sm w-full sm:w-auto"
        >
          {showForm ? (
            <span>✖ Fechar Formulário</span>
          ) : (
            <span>➕ Nova Tarefa</span>
          )}
        </button>
      </div>

      {showForm && (
        <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-160px)]">
        <div className="animate-fade-in-up mb-8 task-form-scroll">
          
          <TaskForm onCancel={() => setShowForm(false)} />
        </div>
        </div>
      )}      
      <TaskList />
    </div>
  )
}
export default Dashboard
```

### 2.5 App

```bash
function App() {
  return (
    
    <div className="min-h-screen bg-gray-800 !important">
      <TaskProvider>
      <AuthProvider>      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>      
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       </AuthProvider>
      </TaskProvider>           
    </div>
  )
}

export default App
```

### 2.6 styles

#### index.css

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;

nav {
  @apply fixed top-0 left-0 right-0 h-20 flex justify-between items-center;
  background: linear-gradient(to bottom, #131727, #2b355a, #131727);
  padding: 0 25px;
  top: 4px;
  z-index: 100;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
}

.nav-brand {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 15px
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 25px;
  height: 100%;
}

.text-xl {
  @apply text-white font-bold;
  font-size: 2.25rem;
}

.text-xl:active {
  color: #86efac;
}

.nav-brand span {
  font-size: 1.65rem;  
}

.btn-primary {
  @apply bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95 transform transition-all duration-200;
  font-size: 1.25rem;
}

@media (max-width: 768px) {

  .text-xl{
    font-size: 1.5rem;
    margin-top: 8px;
  }

  .nav-links{
    gap: 10px; 
  }

  .nav-brand {
    font-size: 1.5rem;
  }
  
  .nav-brand span {
    font-size: 1.2rem;
  }
  
  .btn-primary {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
} 

```

---

## 3. Estrutura Básica Docker

├── docker/docker-compose.yml

### 3.1 docker

#### docker-compose.yml

```bash
services:
  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: taskmanager
      JWT_SECRET: your_jwt_secret_key
      JWT_EXPIRE: 30d
    ports:
      - '5000:5000'
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - task-manager-network

  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ../frontend:/app
      - /app/node_modules  
    environment:
      - VITE_API_URL=http://localhost:5000/api 
      - VITE_API_URL=http://backend:5000/api
    depends_on:
      - backend

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: taskmanager
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - task-manager-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s

volumes:
  postgres_data:

networks:
  task-manager-network:
    driver: bridge
```

---

## 4. Conclusão

- O Task Manager desenvolvido neste projeto consolida uma arquitetura robusta e orientada à escalabilidade, exemplificando a integração harmoniosa de tecnologias fullstack por meio de uma estrutura organizacional clara e práticas de código sustentáveis. Ao aliar ferramentas modernas — como React para a interface dinâmica, Express para a camada de serviços, Sequelize para abstração do banco de dados e Docker para conteinerização — a padrões de desenvolvimento sólidos (modularidade, testes automatizados e separação de responsabilidades), a solução evidencia sua capacidade de adaptação a demandas crescentes sem comprometer a manutenibilidade.
<br>
- O resultado é uma aplicação coesa, testável em suas diferentes camadas e preparada para expansão funcional ou de infraestrutura. Além de validar a eficácia das escolhas tecnológicas adotadas, o projeto estabelece um paradigma prático para iniciativas fullstack, destacando-se como referência para o desenvolvimento de sistemas alinhados às exigências atuais de desempenho, organização e evolução contínua.






