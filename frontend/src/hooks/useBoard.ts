import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBoard, getBoard, updateBoard } from "@/services/boardService";
import { useNavigate } from "react-router-dom";
import { moveTask } from "@/services/taskService";

const tasksByColumnId = (columns: any) => {
  const result = columns.reduce((acc: any, column: any) => {
    acc[column.id] = column.tasks;
    return acc;
  }, {});
  return result;
};

const useBoard = (boardId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId!),
    enabled: !!boardId,
    select: (data) => {
      const tasksByColumn = tasksByColumnId(data.data.columns);
      return { ...data, tasksByColumn };
    },
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

  const moveTaskMutation = useMutation({
    mutationFn: (tasks) => moveTask({ tasks }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });

  return {
    board: query.data,
    isPending: query.isPending,
    isError: query.isError,
    deleteBoard: deleteBoardMutation.mutate,
    updateBoard: updateBoardMutation.mutate,
    isUpdating: updateBoardMutation.isPending,
    moveTask: moveTaskMutation.mutate,
  };
};

export default useBoard;
