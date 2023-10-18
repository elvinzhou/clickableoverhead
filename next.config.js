/** @type {import('next').NextConfig} */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const nextConfig = {
    webpack:(config, {isServer}) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
          }
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader:'@svgr/webpack',options:{svgoCOnfig:'./svgo.config.js'}}],
        })
        return config
    }
}

module.exports = nextConfig