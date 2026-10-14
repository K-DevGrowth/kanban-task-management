import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { useParams } from "react-router-dom";
import useBoard from "@/hooks/useBoard";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "cn";
import FormTask from "./FormTask";

const BoardHeader = () => {
  const { boardId } = useParams();
  const { board } = useBoard(boardId);

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
            <DropdownMenuItem>Edit Board</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default BoardHeader;
