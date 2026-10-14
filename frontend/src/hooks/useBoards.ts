import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, getBoards } from "../services/boardService";

const useBoards = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const createBoardMutation = useMutation({
    mutationFn: (payload) => createBoard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return {
    boards: query.data,
    isPending: query.isPending,
    isError: query.isError,
    createBoard: createBoardMutation.mutate,
    isCreating: createBoardMutation.isPending,
  };
};

export default useBoards;
