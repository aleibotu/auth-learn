import LoginForm from "@/app/auth/login/login-form";

export default function Page() {
    return (
        <div className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <LoginForm />
            </div>
        </div>
    )
}
