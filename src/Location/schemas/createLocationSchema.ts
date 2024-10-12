import { z } from "zod";

const createLocationSchema = z.object({
  imageUrl: z.string().min(2, { message: "nameMustBeAtleast3" }),
  coordX: z.string().transform((val, ctx) => {
    const parsed = Number.parseInt(val.replaceAll(".", ""), 10);
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  coordY: z.string().transform((val, ctx) => {
    const parsed = Number.parseInt(val.replaceAll(".", ""), 10);
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  mapId: z.number().min(1, { message: "Debe seleccionar una categoria" }),
});

export type CreateLocationSchema = z.infer<typeof createLocationSchema>;

export default createLocationSchema;
