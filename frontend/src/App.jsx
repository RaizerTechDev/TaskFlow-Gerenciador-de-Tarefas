import { TaskProvider } from './contexts/TaskContext'
import { AuthProvider } from './contexts/AuthContext'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home';
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound' 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    
    <div className="min-h-screen bg-gray-800 !important">
      <TaskProvider>
      <AuthProvider>      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />               
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>      
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       </AuthProvider>
      </TaskProvider>           
    </div>
  )
}

export default App