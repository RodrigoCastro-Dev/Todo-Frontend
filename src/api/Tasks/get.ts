import { useQuery } from '@tanstack/react-query'
import { TasksResponse } from '../../components/Home'
import { toast } from 'react-toastify'
import { API_URL } from '..'
import api from '../axiosInstance'

const graphqlRequest = async (variables: {
  description: string
  completed: string
}) => {
  const query = `query ($description: String, $completed: Boolean) { 
    tasks(description: $description, completed: $completed) { 
      id 
      description 
      completed 
    } 
  }`

  const adjustedVariables = (() => {
    if (variables.completed === '') {
      return null
    } else if (variables.completed === 'completed') {
      return { ...variables, completed: true }
    } else {
      return { ...variables, completed: false }
    }
  })()

  try {
    const response = await api.post(`${API_URL}/graphql`, {
      query,
      variables: adjustedVariables,
    })

    return response.data
  } catch (error) {
    toast.error('Failed to fetch tasks. Please try again.')
    throw error
  }
}

export const getTasks = (description: string, completed: string) => {
  return useQuery<TasksResponse>({
    queryKey: ['todos', description, completed],
    queryFn: () => graphqlRequest({ description, completed }),
    staleTime: 1000 * 60 * 5,
  })
}
