/** @type {import('next').NextConfig} */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const nextConfig = {
    if (isServer) {
        config.plugins = [...config.plugins, new PrismaPlugin()]
      }
    webpack:(config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader:'@svgr/webpack',options:{svgoCOnfig:'./svgo.config.js'}}],
        })
        return config
    }
}

module.exports = nextConfig