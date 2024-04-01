import Credentials from 'next-auth/providers/credentials'
import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [Credentials({
        async authorize(credential) {
            const validatedFields = LoginSchema.safeParse(credential)

            if(validatedFields.success) {
                const {email, password} = validatedFields.data

                const user = await getUserByEmail(email)

                if(!user || !user.password) return null

                const passwordsMatch = await bcrypt.compare(password, user.password)

                if(passwordsMatch) return user

                return null
            }
        }
    })],
}
