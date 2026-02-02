import * as z from "zod";

import { emailSchema, passwordSchema } from "@/shared/lib/validation";

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});
