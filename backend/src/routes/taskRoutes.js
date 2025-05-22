const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getTasks,
  getTasksByid,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

console.log({ getTasks, getTasksByid, createTask, updateTask, deleteTask });

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .get(protect, getTasksByid)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;