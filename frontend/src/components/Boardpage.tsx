import { useParams } from "react-router-dom";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import useBoard from "@/hooks/useBoard";
import Column from "./Column";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "cn";
import FormColumn from "./FormColumn";
import { useEffect, useState } from "react";

const Boardpage = () => {
  const { boardId } = useParams();
  const { board, isPending, isError, moveTask } = useBoard(boardId);
  const [tasksByColumn, setTaskByColumn] = useState({});

  useEffect(() => {
    if (board?.tasksByColumn) {
      setTaskByColumn(board?.tasksByColumn);
    }
  }, [board?.tasksByColumn]);

  if (isPending) return "loading...";
  if (isError) return "error...";

  return (
    <DragDropProvider
      onDragOver={(event) => {
        if (event.operation.source?.type === "task") {
          setTaskByColumn((prev) => move(prev, event));
        }
      }}
      onDragEnd={(event) => {
        const source = event.operation.source;
        if (!source || source.type !== "task") return;

        const { initialGroup, group } = source;

        const affectedColumns =
          initialGroup === group ? [group] : [initialGroup, group];

        const updates = affectedColumns.flatMap((columnId) =>
          (tasksByColumn[columnId] ?? []).map((task, order) => ({
            id: task.id,
            columnId,
            order,
          })),
        );

        moveTask(updates);
      }}
    >
      <div className="grid grid-flow-col gap-4 p-4">
        {board?.data.columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            index={index}
            tasks={tasksByColumn[column.id] || []}
          />
        ))}
        <div>
          <Dialog>
            <DialogTrigger className={cn("w-full text-left")}>
              Create New Column
            </DialogTrigger>

            <DialogContent>
              <FormColumn />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default Boardpage;
