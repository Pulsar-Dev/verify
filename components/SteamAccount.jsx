import React from "react";

export default function Account({account, onClick, canClick}) {
    const id = account.id
    const name = account.name

    const [loading, setLoading] = React.useState(false)
    const onClickFunc = () => {
        onClick(id)
        setLoading(true)
    }

    return (
        <>
            <div className="flex w-full justify-between rounded-lg backdrop-blur bg-white/50 px-4 py-2">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 gap-0">
                        <h1 className="text-xl font-semibold block">{name}</h1>
                        <h2 className="relative text-xs text-gray-600 block">{id}</h2>
                    </div>
                </div>
                <div className="flex items-center justify-center right pl-24">
                    {!loading ? <>
                            {canClick ?
                                <button
                                    className="flex items-center justify-center bg-blurple-50 hover:bg-blurple-100 rounded-md"
                                    onClick={onClickFunc}>
                                    <h1 className="text-lg text-white text-center py-1 px-10">Select</h1>
                                </button> :
                                <button className="flex items-center justify-center bg-gray-500 rounded-md cursor-default">
                                    <h1 className="text-lg text-white text-center py-1 px-10">Select</h1>
                                </button>
                            } </> :
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}
