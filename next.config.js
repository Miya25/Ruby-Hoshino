/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV == "development",
});
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
                formats: ["image/avif", "image/webp", "image/jpg", "image/png"],
                dangerouslyAllowSVG: true,
                remotePatterns: [{
                    protocol: "https",
                    hostname: "cdn.topiclist.xyz",
                    pathname: "/**",
                }, ],
            },
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 100, 128, 150, 256, 384],
        });
    },
};