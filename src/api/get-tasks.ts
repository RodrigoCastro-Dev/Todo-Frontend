import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TasksResponse } from '../components/Home'

const url = "http://localhost:3000/graphql"

const graphqlRequest = async (variables = {}) => {
  const query = `query { tasks { id title completed } }`;

  try {
    const response = await axios.post(url, {
      query,
      variables
    }, {
      headers: { "Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxN2EzYmNmNS1lOTcxLTRjMTQtYjhiNS04NjI4OTM0MzhjM2EiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQxNTQ5NTM0LCJleHAiOjE3NDE2MzU5MzR9.lOjZIJmLO6yUeTYPPwTxImTJe6BO3mf4OpO34ycIxnY" }
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
