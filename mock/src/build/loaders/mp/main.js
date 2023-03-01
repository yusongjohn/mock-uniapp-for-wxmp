// const loaderUtils = require('loader-utils')
const jsonHandler = require('../../common/json');

module.exports = async function (content) {
    this.cacheable && this.cacheable()

    // if (this.resourceQuery) { // 处理 main.js?page=pageA
    //     const params = loaderUtils.parseQuery(this.resourceQuery)
    //     const pagePath = `${params.page}.vue`
    //     const middleCode = [`import Vue from 'vue';`, `import Page from './${pagePath}';`, `createPage(Page);`].join('\n')
    //     return this.callback(null, middleCode)
    // } else { // 处理 main.js

    // 1.  从 main.js 中收集全局组件 Vue.component(...)
    jsonHandler.updatePageJson('app', {
        usingComponents: {
            "todo-item": "./components/todo-item"
        }
    })

    // const babelLoader = this.loaders.find(loader => loader.path.indexOf('babel-loader') !== -1)
    // if (babelLoader) {
    //     addCreateApp(babelLoader) // 怀疑是options 共享问题，实际上不应该共享，使用babel.config.js而不是rules.loader.options??
    // }

    // 2. 通过dynamic import来将组件单独拆分出去（通用逻辑，全局组件和局部组件都需要）


    return content

}