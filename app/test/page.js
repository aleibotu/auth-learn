'use client'
import {useState, useTransition,} from 'react'
import {submitAction, otherAction} from "@/app/test/action";

export default function Page() {
    const [submitStatus, setSubmitStatus] = useState({
        pending: false,
        msg: ''
    });
    const [otherStatus, setOtherStatus] = useState();

    const handleSubmit = async () => {
        submitAction()
    }

    const handleOther = () => {
        otherAction()
    }

    return (
        <form className="w-full flex justify-center pt-10" action={handleSubmit}>
            <div>
                <input type="text" className="border"/>
                <br/>
                <br/>
                <div className="flex gap-4">
                    <button
                        className="border p-1"
                        formAction={handleOther}
                    >
                        handle other
                    </button>

                    <button
                        className="border p-1"
                        type="submit"
                    >
                        submit
                    </button>
                </div>
            </div>
        </form>
    )
}
