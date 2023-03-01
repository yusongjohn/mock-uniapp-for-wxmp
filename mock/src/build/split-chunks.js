const {normalizePath} = require('./common/utils')


module.exports = {
    cacheGroups: {
        default: false,
        vendors: false,
        commons: {
            test(module) {
                if (module.type === 'css/mini-extract') {
                    return false
                }

                const mainPath = `${process.env.context}/main.`;

                if (module.resource && (module.resource.indexOf('.vue') !== -1 || normalizePath(module.resource).indexOf(mainPath) === 0)) {
                    return false
                }

                return true
            },
            minChunks: 1,
            name: 'common/vendor',
            chunks: 'all'
        }
    }
}