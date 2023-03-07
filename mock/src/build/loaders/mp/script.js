const path = require('path');
const { removeExt } = require('../../common/utils');
const processComponents = require('./babel/index')

// 暂时只是解析 export default {components:{}} 写法
const traverse = require('./babel/scoped-component-traverse');

module.exports = async function (content) {

    this.cacheable && this.cacheable()

    const context = process.env.context;
    resourcePath = removeExt(path.relative(context, this.resourcePath))

    if (resourcePath === 'App') resourcePath = 'app'; // App.vue中的components变成全局组件了？

    const callback = this.async();
    const pasePromise = processComponents(this, traverse, { content, resourcePath });
    pasePromise.then(() => callback(null, content)).catch(err => callback(err, content))
}

