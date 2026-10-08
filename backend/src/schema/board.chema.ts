import z from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(1),
});
