import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

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

  const validateFields = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = 'Email é obrigatório';
    }
    if (!credentials.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      await login(credentials);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Credenciais inválidas';
      
      // Captura mensagem específica do backend
      if (error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast.error(errorMessage);
      setErrors({
        ...errors,
        server: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      
      {errors.server && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div>
        <input
            type="email"
            id="email"
            name="email"
            placeholder='Digite seu email'
            value={credentials.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>        
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
                placeholder='Digite sua senha'
              value={credentials.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
              disabled={loading}
            />
          <button
            type="button" 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
                <span className="text-sm">🙈</span>
              ) : (
                <span className="text-sm">👁️</span>
              )}
          </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-button"
        >
           {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="login-footer">
        <p>
          Não tem uma conta?{' '}
          <a
            href="/register"
            className="text-primary hover:text-primary-dark font-medium"
          >
            Registre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;