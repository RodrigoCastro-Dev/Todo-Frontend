import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ITask } from '../../components/Home'
import { API_URL } from '..'
import { toast } from 'react-toastify'
import api from '../axiosInstance'

const createTask = async (task: ITask) => {
  const response = await api.post(`${API_URL}/graphql`, {
    query: `mutation { createTask(input: { description: \"${task.description}\", completed: ${task.completed} }) { task { id title description completed } } }`,
  })

  return response.data.data.createTask.task
}

export const usePostTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.removeQueries()
      toast.success('Task created!')
    },
  })
}
