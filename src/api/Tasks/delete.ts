import { useMutation } from "@tanstack/react-query";
import { API_URL } from "..";
import { toast } from "react-toastify";
import api from "../axiosInstance";

const deleteTask = async (task_id: number) => {
  const response = await api.post(
    `${API_URL}/graphql`,
    {
      query: `mutation { deleteTask(input: { id: ${task_id} }) { message } }`,
    },
  );

  return response.data.data.deleteTask.message;
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      console.log("Task deleted!", data);
      toast.success("Task deleted!");
    },
  });
};
