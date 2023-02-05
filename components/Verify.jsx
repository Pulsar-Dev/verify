import Logo from "@/components/Logo";

export default function Verify({text}) {
    return (
        <>
            <div className="relative">
                <Logo/>
                <div>
                    {text ?
                        <h1 className="text-xl text-white text-center">{text}</h1>
                        :
                        <svg className="spinner" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                    }
                </div>

            </div>
        </>
    )
}
