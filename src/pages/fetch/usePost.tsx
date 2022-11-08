import useSWR from "swr";
import { fetcher } from "./fetcher";
export const usePost = () => {
  const { data, error } = useSWR(`http://localhost:4000/api/v1/todos`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePost;
