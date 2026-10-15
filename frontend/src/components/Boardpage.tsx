import { useParams } from "react-router-dom";
import { DragDropProvider } from "@dnd-kit/react";
import useBoard from "@/hooks/useBoard";
import Column from "./Column";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "cn";
import FormColumn from "./FormColumn";
import { useEffect, useState } from "react";

const Boardpage = () => {
  const { boardId } = useParams();
  const { board, isPending, isError } = useBoard(boardId);
  const [tasksByColumn, setTaskByColumn] = useState({});

  useEffect(() => {
    function fetch() {
      setTaskByColumn(board?.tasksByColumn);
    }
    fetch();
  }, [board?.tasksByColumn]);

  if (isPending) return "loading...";
  if (isError) return "error...";

  return (
    <DragDropProvider>
      <div className="grid grid-flow-col gap-4 p-4">
        {board?.data.columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            index={index}
            tasks={column.tasks}
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
