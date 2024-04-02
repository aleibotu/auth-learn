'use server'
import {Resend} from "resend";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const sendEmail = async (formData, token) => {
    const email = formData.get('email');

    // todo check use zod

    const user = await getUserByEmail(email)

    if (user) return 'email already in use'

    // email verification
    const code = Math.floor(100000 + Math.random() * 900000);

    const expires = new Date(new Date().getTime() + 2 * 60 * 1000)
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Hello World',
        html: `
                <p>
                    Congrats on sending your <strong>first email</strong>! 
                    your code is ${code}, expire on ${expires}
                </p>
        `
    });

    const register = await db.verificationCode.findUnique({where: {email}});

    if (register) {
        await db.verificationCode.update({where: {email}, data: {code, expires_at: expires}})
    } else {
        await db.verificationCode.create({data: {email, code, expires_at: expires}})
    }

    return 'email sent'

}
