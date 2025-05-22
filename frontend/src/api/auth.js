import api from './axios'

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    localStorage.removeItem('token')
    return null
  }
}