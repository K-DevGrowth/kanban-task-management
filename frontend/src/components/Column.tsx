import Task from "./Task";

const Column = ({ title, tasks }) => {
  return (
    <div className="p-4">
      <p>{title}</p>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} />
        ))}
      </div>
    </div>
  );
};

export default Column;
