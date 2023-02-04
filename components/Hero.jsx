import Image from 'next/image'
import Link from "next/link";

export default function Hero() {
    const discordUrl = "https://discord.com/api/oauth2/authorize?client_id=983113611364937778&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&response_type=code&scope=connections%20identify"
    return (
        <>
            <div className="">
                <div>
                    <Image
                        alt="Pulsar Verify"
                        src={"/img/white.png"}
                        width={256}
                        height={256}
                    />
                </div>
                <div>
                    <Link className="flex items-center justify-center mt-6 bg-blurple-50 rounded-md" href={discordUrl}>
                        <h1 className="text-lg text-white text-center py-1 px-12">Login with Discord</h1>
                    </Link>
                </div>

            </div>

            <div className="bg-gradient"></div>
        </>
    )
}
