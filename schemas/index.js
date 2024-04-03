import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const SendEmailSchema = z.object({
    email: z.string().email()
})
