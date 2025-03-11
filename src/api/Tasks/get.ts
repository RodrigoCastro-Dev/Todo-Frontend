import { useQuery } from "@tanstack/react-query";
import { TasksResponse } from '../../components/Home'
import { toast } from "react-toastify";
import { API_URL } from "..";
import api from "../axiosInstance";

const graphqlRequest = async (variables = {}) => {
  const query = `query { tasks { id title completed } }`;

  try {
    const response = await api.post(`${API_URL}/graphql`, {
      query,
      variables
    });

    return response.data;
  } catch (error) {
    toast.error("Failed to fetch tasks. Please try again.");
    throw error;
  }
};

export const getTasks = () => {
  return useQuery<TasksResponse>({
    queryKey: ["todos"],
    queryFn: () => graphqlRequest(),
  });
};
