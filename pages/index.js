import Hero from "@/components/Hero";
import {useEffect} from "react";

export default function Home() {

    return (
        <>
            <div className="flex items-center justify-center align-center py-12">
                <Hero/>
            </div>

            <div className="bg-gradient"></div>
        </>
    )
}
