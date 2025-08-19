import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useTasks } from './TaskContext';
import { toast } from 'react-toastify';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate()
  const { clearTasks } = useTasks()

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        // Configura token no axios
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email
      }));
      
      setUser({
        id: data.id,
        username: data.username,
        email: data.email
      });
      
      // Configura token no axios
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Login failed' };
    }
  };
  
  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.data.id,
        username: data.data.username,
        email: data.data.email
      }));
      
      setUser({
        id: data.data.id,
        username: data.data.username,
        email: data.data.email
      });
      
      // Configura token no axios
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      let errorMessage = 'Erro ao registrar';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        
        if (error.response.status === 400) {
          errorMessage = error.response.data.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  };
  
  const logout = async () => {
    try {
      // Remove dados do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Limpa estado
      setUser(null);
      
      // Remove token do axios
      delete api.defaults.headers.Authorization;
      
      // Limpa tasks
      clearTasks();    
      
      toast.success('Logout realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};