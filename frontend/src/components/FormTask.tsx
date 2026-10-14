import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "cn";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useTask from "@/hooks/useTask";
import useBoard from "@/hooks/useBoard";

const FormTask = () => {
  const { boardId } = useParams();
  const { board, isError, isPending } = useBoard(boardId);
  const { createTask } = useTask();

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ title: "" }, { title: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit = ({ columnId, ...payload }) => {
    createTask({ columnId, payload });
  };

  if (isError) return "error...";
  if (isPending) return "loading...";

  const columns = board.data.columns;

  return (
    <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            type="text"
            placeholder="TODO"
            {...register("title", { required: true })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input
            id="description"
            type="text"
            placeholder=""
            {...register("description")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="subtasks">Subtasks</FieldLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4">
              <Input
                id={field.id}
                {...register(`subtasks.${index}.title`, { required: true })}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={() => append({ title: "" })}
          >
            Add New Subtask
          </Button>
        </Field>
        <Field>
          <Controller
            name="columnId"
            control={control}
            defaultValue={columns[0]?.id}
            render={({ field }) => (
              <Select
                items={columns.map((c) => ({
                  value: c.id,
                  label: c.title,
                }))}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field orientation="horizontal">
          <Button className={cn("w-full rounded-2xl")} type="submit">
            Create Task
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormTask;
