import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Task = ({ title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>0 of 0 subtasks</p>
      </CardContent>
    </Card>
  );
};

export default Task;
