/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.cloudflare.steamstatic.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
