import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../services/boardService";

const useBoards = () => {
  const query = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  return {
    boards: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
};

export default useBoards;
