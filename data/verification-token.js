import {db} from "@/lib/db";

export const getVerificationToken = async (email) => {
    try {
        return await db.verificationToken.findFirst({
            where: {email}
        })
    } catch {
        return null
    }
}
