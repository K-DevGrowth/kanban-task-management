import { useParams } from "react-router-dom";
import useBoard from "@/hooks/useColumn";
import Column from "./Column";

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
    <div className="grid grid-cols-3 gap-4">
      {board.data.columns.map((column) => (
        <Column key={column.id} title={column.title} tasks={column.tasks} />
      ))}
    </div>
  );
};

export default Boardpage;
