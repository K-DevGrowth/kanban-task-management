import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumn } from "@/services/columnService";

const useColumn = () => {
  const queryClient = useQueryClient();

  const createColumnMutation = useMutation({
    mutationFn: ({ boardId, payload }) => createColumn(boardId, payload),
    onSuccess: (_data, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });

  return {
    createColumn: createColumnMutation.mutate,
  };
};

export default useColumn;
