'use server'
import bcrypt from 'bcryptjs'
import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {login} from "@/actions/login";

export const register = async (formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const verificationCode = formData.get('verificationCode')
    const validatedFields = RegisterSchema.safeParse({email, password});

    if (!validatedFields.success) {
        return {success: false, msg: 'Invalid fields'}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await getUserByEmail(email)

    if (user) return {success: false, msg: 'email already in use'}

    const register = await db.verificationCode.findUnique({where: {email}});

    // 比较 code 时间 现在 < 过期, 就是没过期
    const expires = new Date() < register.expires_at

    if (!register || !expires || String(register.code) !== verificationCode) return {
        success: false,
        msg: 'code wrong, retry'
    }

    await db.user.create({data: {email, password: hashedPassword, emailVerified: new Date()}})

    await login(formData)
}
