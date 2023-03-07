// const loaderUtils = require('loader-utils')
const { removeExt } = require("../../common/utils");
const path = require('path')

module.exports = function (content) {
    this.cacheable && this.cacheable()
    const page = path.relative(process.env.context, this.resourcePath)
    const resourcePath = `${removeExt(page)}.wxml`;

    const vueLoaderOptions = this.loaders.find(loader => loader.ident === 'vue-loader-options')

    Object.assign(vueLoaderOptions.options.compilerOptions, {
        resourcePath,
        emitFile: this.emitFile
    })
    this.callback(null, content)
}