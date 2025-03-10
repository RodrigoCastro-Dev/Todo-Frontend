import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TasksResponse } from '../components/Home'

const API_URL = import.meta.env.VITE_API_URL as string;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN as string;

const graphqlRequest = async (variables = {}) => {
  const query = `query { tasks { id title completed } }`;

  try {
    const response = await axios.post(API_URL, {
      query,
      variables
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error;
  }
};

export const getTasks = () => {
  return useQuery<TasksResponse>({
    queryKey: ["todos"],
    queryFn: () => graphqlRequest(),
    staleTime: Infinity,
  });
};
