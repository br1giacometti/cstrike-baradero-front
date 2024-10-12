import { z } from "zod";

const createMatchSchema = z.object({});

export type CreateMatchSchema = z.infer<typeof createMatchSchema>;

export default createMatchSchema;
