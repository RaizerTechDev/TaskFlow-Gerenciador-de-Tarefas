import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  createTask,  
  getTasks,
  updateTask as apiUpdateTask, 
  deleteTask as apiDeleteTask
} from '../api/tasks';

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all');

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

  const addTask = async (taskData) => {
    try {
      console.log('Enviando dados:', taskData);
      
   const newTask = await createTask(taskData);
      
      console.log('Resposta recebida:', newTask);
  
      if (!newTask?.id) {
        throw new Error('Resposta inválida da API');
      }
  
      setTasks(prev => [newTask, ...prev]);
      return newTask;
  
    } catch (error) {
      console.error('Erro detalhado:', {
        message: error.message,
        requestData: taskData,
        stack: error.stack
      });
      throw error;
    }
  };

   const updateTask = async (id, taskData) => {
  try {
    const updatedTask = await apiUpdateTask(id, taskData);
    
    if (!updatedTask) {
      throw new Error('Resposta da API vazia');
    }
    
    setTasks(prev => 
      prev.map(task => task.id === id ? updatedTask : task)
    );
    return updatedTask;
  } catch (error) {
    console.error('Erro na atualização:', error.response?.data || error.message);
    throw error; 
  }
};

const deleteTask = async (id) => {
  try {
    await apiDeleteTask(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw new Error(error.message || 'Falha ao excluir tarefa');
  }
};

  const clearTasks = () => {
    setTasks([]);
    setLoading(false);
}  

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      filter,
      setFilter,     
      error,
      fetchTasks,
      addTask,
      getTasks,
      updateTask,
      deleteTask,
      clearTasks    
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
      throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};