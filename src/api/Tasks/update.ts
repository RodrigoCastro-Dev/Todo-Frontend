import { useMutation } from '@tanstack/react-query'
import { ITask } from '../../components/Home'
import { API_URL } from '..'
import { toast } from 'react-toastify'
import api from '../axiosInstance'

const updateTask = async (task: ITask) => {
  const response = await api.post(`${API_URL}/graphql`, {
    query: `mutation { updateTask(input: { id: \"${task.id}\", description: \"${task.description}\", completed: ${task.completed} }) { task { id description completed } } }`,
  })

  return response.data.data.updateTask.task
}

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success('Task updated!')
    },
  })
}
