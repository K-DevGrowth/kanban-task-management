import { useQuery } from "@tanstack/react-query";

const fetchBoard = async (boardId: string) => {
  const res = await fetch(`/api/v1/boards/${boardId}/columns`);
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
};

const useBoard = (boardId: string) => {
  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => fetchBoard(boardId!),
    enabled: !!boardId,
  });

  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
};

export default useBoard;
