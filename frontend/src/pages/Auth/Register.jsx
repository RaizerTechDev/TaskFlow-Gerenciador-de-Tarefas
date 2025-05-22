import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import api from '../../api/axios';

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

  // Validação da senha em tempo real
  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres')
    } else {
      setPasswordError('')
    }
  }

  // Validação de confirmação de senha em tempo real
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== userData.password) {
      setConfirmPasswordError('As senhas não coincidem')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setUserData({...userData, password: newPassword})
    validatePassword(newPassword)
    if (userData.confirmPassword) validateConfirmPassword(userData.confirmPassword)
  }

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value
    setUserData({...userData, confirmPassword: newConfirmPassword})
    validateConfirmPassword(newConfirmPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação final antes do envio
    if (passwordError || confirmPasswordError) {
      toast.error("Corrija os erros antes de enviar");
      return;
    }

    if (!userData.username || !userData.email || !userData.password) {
      toast.error("Preencha todos os campos");
      return;
    }
  
    setLoading(true);
    
    try {
      await register({
        username: userData.username.trim(),
        email: userData.email.trim(),
        password: userData.password
      });
      
      toast.success("Cadastro realizado com sucesso!");
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      
      const message = error.message.includes("Email já cadastrado")
      ? "Este email já está em uso"
      : error.message.includes("Network Error")
      ? "Não foi possível conectar ao servidor"
      : error.message; 
    
      toast.error(message);
      
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    try {
      const testURL = import.meta.env.VITE_API_URL;
      console.log('Testando conexão com:', testURL);      
     
      const response = await api.get('/auth/test'); 
      console.log('Resposta do backend:', response.data);
      toast.success(`Backend respondeu: ${response.data.message}`);
    } catch (error) {
      console.error('Erro completo:', error);
      
      let errorMessage = 'Erro desconhecido';
      if (error.response) {
        errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || 'Sem detalhes'}`;
      } else if (error.request) {
        errorMessage = 'Servidor não respondeu. Verifique se o backend está rodando.';
      } else {
        errorMessage = `Erro na requisição: ${error.message}`;
      }
  
      toast.error(`Falha na conexão: ${errorMessage}`);
    }
  };

    return (
    <div className="register-container">
      <h2 className="register-title">Cadastro</h2>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input
            id="username"
            type="text"
            className="input-field autocomplete"
            value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input-field autocomplete"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="input-field autocomplete"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            required
            minLength="6"
            autoComplete="new-password"
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

          <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <div className="password-container relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="input-field w-full pr-10"  
              value={userData.confirmPassword}
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
              required
              minLength="6"
              autoComplete="new-password" 
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <span className="text-sm">🙈</span>
              ) : (
                <span className="text-sm">👁️</span>
              )}
            </button>
          </div>
        </div>

     
        <button
          type="submit"
          disabled={loading}
          className="register-button"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <div className="register-footer">
        <p>
          Já tem uma conta?{' '}
          <Link to="/login" className="login-link">
            Faça login
          </Link>
        </p>
      </div> 
      </div>
    )
}

export default Register