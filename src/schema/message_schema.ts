import { z } from "zod";

export const MessageSchema = z.object({
  message: z.string().min(1).max(2000).trim(),
  role: z.string().nullable(),
  user_id: z.string().nullable(),
});

export type Message = z.infer<typeof MessageSchema>;