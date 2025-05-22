const { Task, User } = require('../models');
const asyncHandler = require('express-async-handler');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private

const getTasksByid = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  if (!Number.isInteger(Number(taskId))) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const task = await Task.findOne({
    where: {
      id: taskId,
      userId: req.user.id 
    }
  });

  if (!task) {
    return res.status(404).json({ 
      message: 'Tarefa não encontrada neste dashboard',
      debug: {
        requestedId: taskId,
        userId: req.user.id
      }
    });
  }

  res.json(task);
});
// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
// Função createTask corrigida

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, taskDate } = req.body;

    // Validação básica
    if (!title) {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }

    // Criação direta da task
    const task = await Task.create({
      title,
      description,
      taskDate: taskDate || null,
      userId: req.user.id
    });

    // Resposta simplificada
    res.status(201).json({
      id: task.id,
      title: task.title,
      status: task.status,
      taskDate: task.taskDate
    });

  } catch (error) {
    console.error('Erro no backend:', error);
    res.status(500).json({
      message: 'Erro interno no servidor'
    });
  }
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, taskDate } = req.body;

  const task = await Task.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.taskDate = taskDate || task.taskDate;

    await task.save();
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (task) {
    await task.destroy();
    res.status(204).json();
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

module.exports = {
  getTasks,
  getTasksByid,
  createTask,
  updateTask,
  deleteTask,
};
