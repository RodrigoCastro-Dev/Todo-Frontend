import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ITask } from "../components/Home";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN as string;
const API_URL = import.meta.env.VITE_API_URL as string;

const createTask = async (task: ITask) => {
  const response = await axios.post(
    API_URL,
    {
      query: `mutation { createTask(input: { title: \"${task.title}\", description: \"${task.title}\", completed: ${task.completed} }) { task { id title description completed } } }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response.data.data.createTask.task;
};

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
