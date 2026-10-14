import { useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "cn";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import useColumn from "@/hooks/useColumn";

const FormColumn = () => {
  const [title, setTitle] = useState("");
  const { boardId } = useParams();
  const { createColumn } = useColumn();

  return (
    <form
      className="w-full max-w-xs"
      onSubmit={(e) => {
        e.preventDefault();
        createColumn({ boardId, payload: { title } });
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            type="text"
            placeholder="TODO"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field orientation="horizontal">
          <Button className={cn("w-full rounded-2xl")} type="submit">
            Create Column
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormColumn;
