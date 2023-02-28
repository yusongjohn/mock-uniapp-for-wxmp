const {normalizePath} = require('./utils')
// TODO 补充分包的场景

module.exports = {
    chunks(chunk) { // 防止 node_modules 内 @dcloudio 组件被 split
        return chunk.name.indexOf('node-modules') !== 0
    },
    cacheGroups: {
        default: false,
        vendors: false,
        commons: {
            test(module) {
                if (module.type === 'css/mini-extract') {
                    return false
                }
                const mainPath = `${process._globalInfo.context}/main.`;

                if (module.resource && (
                    module.resource.indexOf('.@dcloudio') !== -1 ||
                    normalizePath(module.resource).indexOf(mainPath) === 0 // main.js
                )) {
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