import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useBoard from "@/hooks/useBoard";
import { cn } from "cn";

const AlertDialogDestructive = () => {
  const { boardId } = useParams();
  const { deleteBoard } = useBoard(boardId);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className={cn("w-full")}>
            Delete Board
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete board?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this board. View{" "}
            <a href="#">Settings</a> delete any memories saved during this
            board.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => deleteBoard(boardId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDestructive;
