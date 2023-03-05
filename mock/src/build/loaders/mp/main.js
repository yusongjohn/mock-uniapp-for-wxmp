// const loaderUtils = require('loader-utils')
const jsonHandler = require('../../common/json');

module.exports = async function (content) {
    this.cacheable && this.cacheable()

    // 1.  从 main.js 中收集全局组件 Vue.component(...)
    jsonHandler.updatePageJson('app', {
        usingComponents: {
            "todo-item": "./components/todo-item"
        }
    })

    // 2. 通过dynamic import来将组件单独拆分出去（通用逻辑，全局组件和局部组件都需要）

    return content

}