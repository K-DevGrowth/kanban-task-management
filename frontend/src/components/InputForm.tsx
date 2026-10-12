import { cn } from "cn";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import useBoards from "@/hooks/useBoards";
import { useState } from "react";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const { createBoard } = useBoards();

  return (
    <form
      className="w-full max-w-xs"
      onSubmit={(e) => {
        e.preventDefault();
        createBoard({ title });
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            type="text"
            placeholder="Platform Launch"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field orientation="horizontal">
          <Button className={cn("w-full rounded-2xl")} type="submit">
            Create Board
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default InputForm;
