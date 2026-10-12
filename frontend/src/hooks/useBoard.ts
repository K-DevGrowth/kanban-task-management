import { getBoard } from "@/services/boardService";
import { createColumn } from "@/services/columnService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useBoard = (boardId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId!),
    enabled: !!boardId,
  });

  const createColumnMutation = useMutation({
    mutationFn: (payload) => createColumn(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });

  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
    createColumn: createColumnMutation.mutate,
  };
};

export default useBoard;
