import api from './axios';

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    
    if (response.status !== 201) {
      throw new Error(`Erro inesperado: ${response.status}`);
    }
    
    return response.data;
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Erro ao criar tarefa';
    throw new Error(errorMessage);
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao buscar tarefas' };
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    
    if (!response.data) {
      throw new Error('Resposta da API vazia');
    }
    
    return response.data;
    
  } catch (error) {
    // Melhore o tratamento de erros
    const errorData = error.response?.data || { 
      message: 'Erro na atualização' 
    };
    throw new Error(errorData.message);
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao excluir tarefa' };
  }
};