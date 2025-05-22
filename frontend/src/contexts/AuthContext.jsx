import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useTasks } from './TaskContext';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { clearTasks } = useTasks()

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

  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      
      localStorage.setItem('token', data.token);
      setUser({
        id: data.data.id, // Acessar corretamente a estrutura de resposta
        username: data.data.username,
        email: data.data.email
      });
      navigate('/dashboard');
      return data;
    } catch (error) {
      let errorMessage = 'Erro ao registrar';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        
        // Adicionar tratamento específico para status 400
        if (error.response.status === 400) {
          errorMessage = error.response.data.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    clearTasks();    
    navigate('/');
     
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)