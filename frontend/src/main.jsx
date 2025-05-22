import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { TaskProvider } from './contexts/TaskContext'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>
)


