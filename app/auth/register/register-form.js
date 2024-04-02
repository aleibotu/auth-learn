'use client'
import {ExclamationCircleIcon, KeyIcon, AtSymbolIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import {register} from "@/actions/register";
import {sendEmail} from "@/actions/sendEmail";
import {useEffect, useState} from "react";
import {useFormState, useFormStatus} from "react-dom";

/**
 * 可以分开， 然后变成两个state, 返回也用 object, not string, 就行， 改写一下。
 * @returns {JSX.Element}
 * @constructor
 */
export default function SignupForm() {
    const [errorMessage, dispatch] = useFormState(register, undefined);
    const [time, setTime] = useState(60);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        let timer = null;
        if (timerRunning) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setTimerRunning(false);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [time, timerRunning]);

    const resetTimer = async (formData) => {
        if (!timerRunning) {
            setTime(60); // Reset time to 300 seconds
            setTimerRunning(true); // Start the timer again
            return await sendEmail(formData)
        }
    };

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    Sign up to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
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
                            Password
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
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="verificationCode"
                        >
                            VerificationCode
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="verificationCode"
                                    type="number"
                                    name="verificationCode"
                                    placeholder="Enter verificationCode"
                                    minLength={6}
                                />
                                <KeyIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>

                            <Button
                                formAction={resetTimer}
                                className="min-w-20"
                                aria-disabled={timerRunning}
                            >
                                {timerRunning ? `${time}` : 'get code'}
                            </Button>
                        </div>
                    </div>
                </div>
                <SignButton/>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <label htmlFor="rememberLogIn" className="text-sm pr-1 text-gray-500">同意条款</label>
                        <input id="rememberLogIn" type="checkbox" required/>
                    </div>
                    <Link className="text-blue-500" href="/auth/login">login</Link>
                </div>
            </div>
        </form>
    );
}

function SignButton() {
    const {pending} = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Button>
    );
}

function Button({children, className, ...rest}) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-10 items-center rounded-lg bg-blue-500 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}
