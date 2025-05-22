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
