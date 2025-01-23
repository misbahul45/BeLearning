import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: '"ik.imagekit.io',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: 'instagram.fsub15-1.fna.fbcdn.net',
                pathname:'/**'
            }
        ]
    }
}

export default nextConfig;
