import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Task = ({ title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Task;
