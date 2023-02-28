const loaderUtils = require('loader-utils')
const {getRelativePath, removeExt} = require("../utils");
const path = require('path')

module.exports = function (content) {
    this.cacheable && this.cacheable()
    const page = path.relative(process._globalInfo.context, this.resourcePath)
    const resourcePath = `${removeExt(page)}.wxml`;

    const vueLoaderOptions = this.loaders.find(loader => loader.ident === 'vue-loader-options')

    Object.assign(vueLoaderOptions.options.compilerOptions, {
        mp: {
            platform: "mp-weixin",
            scopedSlotsCompiler: "auto",
        },
        filterModules: {},
        filterTagName: 'wxs',
        resourcePath,
        emitFile: this.emitFile
    })
    this.callback(null, content)
}