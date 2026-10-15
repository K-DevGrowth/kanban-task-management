import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import Task from "./Task";

const Column = ({ column, tasks, index }) => {
  const { ref } = useSortable({
    id: column.id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["task", "column"],
  });

  return (
    <div ref={ref}>
      <p className="pb-2 px-2">{column.title}</p>
      <div className="*:mb-4">
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            task={task}
            subtasks={task.subtasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
