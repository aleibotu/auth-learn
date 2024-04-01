'use server'
import {LoginSchema} from "@/schemas";
import {signIn} from '@/auth'
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";

export const login = async (prevState, formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const validatedFields = LoginSchema.safeParse({email, password});

    if(!validatedFields) {
        return {error: 'Invalid fields'}
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
                    return 'Invalid credentials'
                default:
                    return 'something went wrong'
            }
        }
        throw error
    }
}
