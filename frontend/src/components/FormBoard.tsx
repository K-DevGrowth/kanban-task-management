import { cn } from "cn";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";

const FormBoard = ({ submitLabel, onSubmit, isPending, initialTitle = "" }) => {
  const [title, setTitle] = useState(initialTitle);

  return (
    <form
      className="w-full max-w-xs"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title });
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
          <Button
            className={cn("w-full rounded-2xl")}
            type="submit"
            disabled={isPending}
          >
            {submitLabel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormBoard;
