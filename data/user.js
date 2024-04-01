import {db} from "@/lib/db";

export const getUserByEmail = async (email) => {
    try {
        return await db.user.findUnique({where: {email}});
    } catch (e) {
        return null
    }
}

export const getUserById = async (id) => {
    try {
        return await db.user.findUnique({where: {id}});
    } catch (e) {
        return null
    }
}
