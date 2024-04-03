'use client';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {ArrowRightIcon, CheckBadgeIcon} from '@heroicons/react/20/solid';
import Link from "next/link";
import {login} from "@/actions/login";
import clsx from "clsx";
import {useState, useTransition} from "react";

export default function LoginForm() {
    const [msg, setMsg] = useState({success: true, msg: null});
    const [pending, startPending] = useTransition()

    const handleSubmit = (formData) => {
        startPending(() => {
            login(formData).then(m => setMsg(m))
        })
    }
    return (
        <form action={handleSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    登录以继续
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            邮箱
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            密码
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <KeyIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                </div>
                <Button className="mt-4 w-full tracking-wide" aria-disabled={pending}>
                    立即登录 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
                </Button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <>
                        {msg && msg.success && msg.msg && (
                            <>
                                <CheckBadgeIcon className="h-5 w-5 text-green-500"/>
                                <p className="text-green-500">{msg.msg}</p>
                            </>
                        )}
                        {msg && !msg.success && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                                <p className="text-red-500">{msg.msg}</p>
                            </>
                        )}
                    </>
                </div>
                <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                        <Link className="text-blue-500" href="/auth/reset"> 忘记密码 </Link>
                    </div>
                    <div>
                        没有账号? 立即
                        <Link className="text-blue-500" href="/auth/register">注册 </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

function Button({children, className, ...rest}) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}
