import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/" className="text-xl">
          Task Manager <span>🏠</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/login" className="btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn-primary">
          Registrar
        </Link>
      </div>
    </nav>
  )
}

export default Navbar