const {updateUsingComponents} = require("../appInfo/json");
module.exports = function (content) {
    this.cacheable && this.cacheable()

    // this.resourcePath

    // 从 .vue?vue&type=script（App.vue, page.vue, component.vue） 中解析出用到的组件
    // 并更新到对应的json文件中，App.vue中的解析更新到全局组件（app.json）中
    const globalComponents = {} || {};
    updateUsingComponents(globalComponents, appJsonFile); // 更新到 app.json

    // 可能需要确认引用的组件是否存在啊，读取对应路径就知道了
    return content;
}