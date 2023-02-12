import React from "react";
import Logo from "@/components/Logo";

export default function Error({error}) {
    if (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="">
                    <Logo/>
                    <h1 className="text-2xl font-semibold text-white">It seems like an error has occurred:</h1>
                    <h2 className="text-xl font-semibold text-white">{error}</h2>
                    <p className="text-xs text-white">If you think this is an error please contact an administrator</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center">
            <div>
                <Logo/>
                <h1 className="text-2xl font-semibold text-white">An unknown error has occurred.</h1>
                <h2 className="text-xl font-semibold text-white">Please contact a site administrator</h2>
            </div>
        </div>
    )
}

