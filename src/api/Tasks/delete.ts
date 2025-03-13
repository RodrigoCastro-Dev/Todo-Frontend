import { useMutation } from '@tanstack/react-query'
import { API_URL } from '..'
import { toast } from 'react-toastify'
import api from '../axiosInstance'

const deleteTask = async (taskId: number) => {
  const response = await api.post(`${API_URL}/graphql`, {
    query: `mutation { deleteTask(input: { id: ${taskId} }) { message } }`,
  })

  return response.data.data.deleteTask.message
}

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success('Task deleted!')
    },
  })
}
