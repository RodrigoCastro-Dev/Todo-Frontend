import axios from 'axios'
import { API_URL } from '.'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Login
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getToken = async () => {
  const token = localStorage.getItem('access_token')

  if (!token) {
    const userEmail = `user_${crypto.randomUUID()}@todolist.com`
    const userPassword = crypto.randomUUID()

    // Create a new user
    await authApi.post('/signup', {
      user: { email: userEmail, password: userPassword },
    })

    // Login with the new user
    const newToken = await authApi.post('/login', {
      user: { email: userEmail, password: userPassword },
    })
    localStorage.setItem('access_token', newToken.data.token)
    return newToken.data.token
  }

  return token
}

api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api
