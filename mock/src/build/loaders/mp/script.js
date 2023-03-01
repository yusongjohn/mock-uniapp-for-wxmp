const path = require('path');
const { removeExt, getAllPages } = require('../../common/utils');
const jsonHandler = require('../../common/json');

module.exports = async function (content) {
    debugger
    this.cacheable && this.cacheable()

    const context = process.env.context;
    const resourcePath = removeExt(path.relative(context, this.resourcePath))
    const dependComponents = {};

    // 判断是不是组件（是不是页面就认为是组件）
    const allPages = getAllPages()
    if (!allPages.includes(resourcePath) && resourcePath !== 'App') {
        jsonHandler.updatePageJson(resourcePath, { component: true });
    }
    const filePath = resourcePath === 'App' ? 'app' : resourcePath
    jsonHandler.updateUsingComponents(filePath, dependComponents);
    
    return content;
}

