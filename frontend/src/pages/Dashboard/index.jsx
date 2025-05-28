import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate();
  const { user } = useAuth()

   useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Ou um loading spinner
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4" >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Olá, {user?.username} 👋
          </h1>
          <p className="text-gray-500 mt-1">Suas tarefas organizadas</p>
        </div>
        <button
          type='button'
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-6 py-2.5 text-sm font-medium rounded-lg transition-all 
          hover:bg-primary/90 transform hover:scale-[1.02] shadow-sm w-full sm:w-auto"
        >
          {showForm ? (
            <span>✖ Fechar Formulário</span>
          ) : (
            <span>➕ Nova Tarefa</span>
          )}
        </button>
      </div>

      {showForm && (
        <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-160px)]">
        <div className="animate-fade-in-up mb-8 task-form-scroll">
          
          <TaskForm onCancel={() => setShowForm(false)} />
        </div>
        </div>
      )}      
      <TaskList />
    </div>
  )
}
export default Dashboard