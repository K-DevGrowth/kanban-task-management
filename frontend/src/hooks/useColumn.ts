import { getBoardColumns } from "@/services/columnService";
import { useQuery } from "@tanstack/react-query";

const useBoard = (boardId: string) => {
  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoardColumns(boardId!),
    enabled: !!boardId,
  });

  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
};

export default useBoard;
