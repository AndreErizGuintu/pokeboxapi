import { z } from "zod";

export const createKeySchema = z.object({name: z.string().min(5).max(100)});
export const deleteKeySchema = z.object({id: z.string().uuid()});
