import z from 'zod'
export const validateFriendSearch = z.string().email().or(z.string().min(10).max(10))