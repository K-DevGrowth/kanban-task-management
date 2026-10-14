import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/services/boardService";

const useBoard = (boardId: string) => {
  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId!),
    enabled: !!boardId,
  });

  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
};

export default useBoard;
