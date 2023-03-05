const path = require('path');
const { removeExt, getAllPages } = require('../../common/utils');
const jsonHandler = require('../../common/json');

module.exports = async function (content) {
    
    this.cacheable && this.cacheable()

    const context = process.env.context;
    const resourcePath = removeExt(path.relative(context, this.resourcePath))

    // TODO 解析出每个vue文件中声明的组件啊
    const dependComponents = {};

    // 判断是不是组件（App.vue、页面.vue、组件.vue三种情况）
    const allPages = getAllPages()
    if (!allPages.includes(resourcePath) && resourcePath !== 'App') {
        jsonHandler.updatePageJson(resourcePath, { component: true });
    }
    const filePath = resourcePath === 'App' ? 'app' : resourcePath
    jsonHandler.updateUsingComponents(filePath, dependComponents);
    
    return content;
}

