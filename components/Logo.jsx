import Image from 'next/image'

export default function Logo() {
    return (
        <>
            <div className="flex items-center justify-center align-center">
                <Image
                    alt="Pulsar Verify"
                    src={"/img/white.png"}
                    width={256}
                    height={256}
                    priority
                />
            </div>
        </>
    )
}
