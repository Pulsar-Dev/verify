import Verify from "@/components/Verify";
import useSWRImmutable from 'swr/immutable'
import {useRouter} from "next/router";

const fetcher = async url => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error('fuck')

        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}

export default function Discord({}) {
    const router = useRouter()
    const {code} = router.query

    const {data, error} = useSWRImmutable(`/api/connection?code=${code}`, fetcher)

    if (error) {
        return (
            <>
                <div className="flex items-center justify-center align-center py-12">
                    <Verify text={`${error.info.data}`}/>
                </div>

                <div className="bg-gradient"></div>
            </>
        )
    }
    if (!data) {
        return (
            <>
                <div className="flex items-center justify-center align-center py-12">
                    <Verify/>
                </div>

                <div className="bg-gradient"></div>
            </>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center align-center py-12">
                <Verify text="Success!"/>
            </div>

            <div className="bg-gradient"></div>
        </>
    )
}


export async function getServerSideProps() {
    return {
        props: {},
    }
}