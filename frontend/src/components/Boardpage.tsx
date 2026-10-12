import { useParams } from "react-router-dom";
import useBoard from "@/hooks/useBoard";
import Column from "./Column";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "cn";
import FormColumn from "./FormColumn";

const Boardpage = () => {
  const { boardId } = useParams();
  const { board, isPending, isError } = useBoard(boardId);

  if (isPending) {
    return "loading...";
  }

  if (isError) {
    return "error...";
  }

  return (
    <div className="grid grid-flow-col gap-4 p-4">
      {board?.data.columns.map((column) => (
        <Column key={column.id} title={column.title} tasks={column.tasks} />
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
  );
};

export default Boardpage;
