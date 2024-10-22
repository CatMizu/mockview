/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['reqres.in', 'media.licdn.com', "picsum.photos"],
    },
};

module.exports = nextConfig;