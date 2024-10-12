import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email("emailInvalid"),
  password: z.string().min(6, { message: "passwordMustBeAtleast6" }),
  firstName: z.string().min(3, { message: "nickNameMustBeAtleast3" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export default createUserSchema;
