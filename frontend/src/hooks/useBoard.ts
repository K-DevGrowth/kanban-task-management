import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBoard, getBoard, updateBoard } from "@/services/boardService";
import { useNavigate } from "react-router-dom";

const useBoard = (boardId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId!),
    enabled: !!boardId,
  });

  const deleteBoardMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: (_data, deletedId) => {
      queryClient.removeQueries({ queryKey: ["boards", deletedId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/");
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: (updatedBoard: { title: string }) =>
      updateBoard(boardId, updatedBoard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
    deleteBoard: deleteBoardMutation.mutate,
    updateBoard: updateBoardMutation.mutate,
    isUpdating: updateBoardMutation.isPending,
  };
};

export default useBoard;
