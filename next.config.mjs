/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/pages',
                permanent: true,
            }
        ]
    } 
};

export default nextConfig;
