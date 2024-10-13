import { z } from "zod";

const updateMatchStatsSchema = z.object({});
export type UpdateMatchStatsSchema = z.infer<typeof updateMatchStatsSchema>;

export default updateMatchStatsSchema;
