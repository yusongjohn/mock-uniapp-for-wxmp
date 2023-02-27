const {updateUsingComponents} = require('../appInfo/json')
const appJsonFile = require('../constant')
// 处理 pageA.vue
module.exports = function (content) {
    this.cacheable && this.cacheable()

    if (this.resourceQuery) { // 处理 main.js?page=pageA.vue
        const path = ''
        const pagePath = `${path}.vue`
        const middleCode = `import Vue from 'vue';import Page from './${pagePath}';createPage(Page);`
        return this.callback(null, middleCode)
    } else { // 处理 main.js
        // 补充条件编译能力 webpack-preprocess-loader

        // 从main.js中收集全局组件 Vue.component(...)
        const globalComponents = {} || {};
        updateUsingComponents(globalComponents, appJsonFile); // 更新到 app.json

        // addCreateApp

        // dynamic import global component to force the component be compiled
    }
}