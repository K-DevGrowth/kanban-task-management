import { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "cn";
import FormTask from "./FormTask";
import AlertDialogDestructive from "./AlertDialogDestructive";
import useBoard from "@/hooks/useBoard";
import FormBoard from "./FormBoard";

const BoardHeader = () => {
  const { boardId } = useParams();
  const { board, isUpdating, updateBoard } = useBoard(boardId);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 h-16 border-b">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">{board?.data.title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger className={cn("w-full text-left")}>
            + Add New Task
          </DialogTrigger>

          <DialogContent>
            <FormTask />
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              Edit Board
            </DropdownMenuItem>
            <AlertDialogDestructive />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update board</DialogTitle>
          </DialogHeader>
          <FormBoard
            submitLabel={"Update Board"}
            onSubmit={({ title }) =>
              updateBoard({ title }, { onSuccess: () => setEditOpen(false) })
            }
            isPending={isUpdating}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default BoardHeader;
