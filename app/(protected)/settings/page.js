import {auth, signOut} from "@/auth";

export default async function Page() {
    const session = await auth()

    return (
        <>
            {JSON.stringify(session)}
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <button type="submit">sign out</button>
            </form>
        </>
    )
}
