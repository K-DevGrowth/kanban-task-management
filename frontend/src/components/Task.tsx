import { useSortable } from "@dnd-kit/react/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Task = ({ task, subtasks, index, columnId }) => {
  const { ref } = useSortable({
    id: task.id,
    index,
    type: "task",
    accept: "task",
    group: columnId,
  });

  return (
    <Card ref={ref} className="">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>0 of {subtasks.length} subtasks</p>
      </CardContent>
    </Card>
  );
};

export default Task;
