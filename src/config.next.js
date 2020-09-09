const withSass = require('@zeit/next-sass')
module.exports = withSass({
    cssModules: true,
    sassLoaderOptions: {
        includePaths: ['./src/scss']
    }
})

module.exports = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/music': { page: '/music' },
            '/video': { page: '/video' },
            '/etc': { page: '/etc' },
            '/blog': { page: '/blog' },
            '/post': { page: '/post' }
        }
    }
}
