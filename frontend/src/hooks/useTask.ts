import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/taskService";

const useTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: ({ columnId, payload }) => createTask(columnId, payload),
    onSuccess: (_data, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });

  return {
    createTask: createTaskMutation.mutate,
  };
};

export default useTask;
