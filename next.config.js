/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [{
            source: "/github",
            destination: "https://github.com/TopicBotList/Ruby-Hoshino",
            permanent: false,
        }, ];
        module.exports = withPWA({
            swcMinify: true,
            compress: true,
            optimizeFonts: true,
            images: {
                formats: ["image/avif", "image/webp"],
                dangerouslyAllowSVG: true,
                remotePatterns: [{
                        protocol: "https",
                        hostname: "cdn.topiclist.xyz",
                    },
                    {
                        protocol: "https",
                        hostname: "api.producthunt.com",
                    },
                ],
            },
        });

    }
}