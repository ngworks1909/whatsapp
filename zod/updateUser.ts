import z from 'zod';

export const updateUser = z.object({
    username: z.string().min(3),
    mobile: z.string().min(10).max(10),
    image: z.string()
});

export type UpdateUser = z.infer<typeof updateUser>