import useSWR from "swr";
import { fetcher } from "./fetcher";
import { apiKey } from "../../components/env";

export const usePost = () => {
  const { data, error } = useSWR(`${apiKey}`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePost;
