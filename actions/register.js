'use server'
import bcrypt from 'bcryptjs'
import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const register = async (prevState, formData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const validatedFields = RegisterSchema.safeParse({name, email, password});

    if(!validatedFields.success) {
        return 'Invalid fields'
    }

    console.log(name, email, password)
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await getUserByEmail(email)

    if(user) return 'email already in use'

    await db.user.create({data: {name, email, password: hashedPassword}})

    return 'user created'
}
