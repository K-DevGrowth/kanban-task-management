import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createTask } from "@/services/taskService";

const useTask = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();

  const createTaskMutation = useMutation({
    mutationFn: ({ columnId, payload }) => createTask(columnId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });

  return {
    createTask: createTaskMutation.mutate,
  };
};

export default useTask;
