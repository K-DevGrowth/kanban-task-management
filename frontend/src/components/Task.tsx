import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Task = ({ title, subtasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>0 of {subtasks.length} subtasks</p>
      </CardContent>
    </Card>
  );
};

export default Task;
