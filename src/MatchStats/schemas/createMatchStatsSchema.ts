import { z } from "zod";

const createMatchStatsSchema = z.object({});

export type CreateMatchStatsSchema = z.infer<typeof createMatchStatsSchema>;

export default createMatchStatsSchema;
