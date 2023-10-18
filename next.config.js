/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['prisma','@prisma/client'],
      },    
    webpack:(config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader:'@svgr/webpack',options:{svgoCOnfig:'./svgo.config.js'}}],
        })
        return config
    }
}

module.exports = nextConfig