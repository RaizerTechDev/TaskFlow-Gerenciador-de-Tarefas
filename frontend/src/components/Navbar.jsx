import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/" className="text-xl">
          Task Manager <span>🏠</span>
        </Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          </>
        ) : (
          // Usuário NÃO logado - mostra Login e Register
          <>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Registrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;