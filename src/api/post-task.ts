import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ITask } from "../components/Home";

const url = "http://localhost:3000/graphql"

const createTask = async (task: ITask) => {
  const response = await axios.post(url,
    {
      query: `
        mutation CreateTask($title: String!, $completed: Boolean!) {
          createTask(input: { title: $title, completed: $completed }) {
            task { id title completed } 
          } 
        }`,
      variables: task,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_ACCESS_TOKEN`
      }
    }
  );

  return response.data.data.createTask.task;
};

export const postTask = (task: ITask) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
}
