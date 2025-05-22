import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página não encontrada</h1>
      <p className="text-lg text-gray-600 mb-8">
        A página que você está procurando não existe.
      </p>
      <Link 
        to="/" 
        className="btn-primary"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default NotFound