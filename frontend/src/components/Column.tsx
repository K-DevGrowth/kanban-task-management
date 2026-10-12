import Task from "./Task";

const Column = ({ title, tasks }) => {
  return (
    <div>
      <p className="pb-2">{title}</p>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} />
        ))}
      </div>
    </div>
  );
};

export default Column;
