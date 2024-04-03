'use server'
import {LoginSchema} from "@/schemas";
import {signIn} from '@/auth'
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {getUserByEmail} from "@/data/user";

export const login = async (formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const validatedFields = LoginSchema.safeParse({email, password});

    if(!validatedFields) {
        return {success: false, msg: 'Invalid fields'}
    }

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {success: false, msg: 'Email does not exist'}
    }

    if(!existingUser.emailVerified) {
        return {success: false, msg: 'check your count'}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {success: false, msg: 'Invalid credentials'}
                default:
                    return {success: false, msg: 'something went wrong'}
            }
        }
        throw error
    }
}
