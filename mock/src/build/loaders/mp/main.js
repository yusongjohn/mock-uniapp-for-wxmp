const loaderUtils = require('loader-utils')
const processComponents = require('./babel/index');

// 暂时只解析 Vue.component('', todoItem) 写法
const traverse = require('./babel/global-component-traverse');

module.exports = async function (content) {
    this.cacheable && this.cacheable();
    if (this.resourceQuery) {
        const callback = this.async();
        const resourcePath = 'app';
        const pasePromise = processComponents(this, traverse, { content, resourcePath });
        pasePromise.then(() => callback(null, content), err => callback(err, content))
    } else {
        const options = loaderUtils.getOptions(this);
        // 注意通过?main让 src/main.js下次被解析是走上面的if分支
        return [`import Vue from 'vue'`, `import '${options.bridge}'`, `import '${this.resourcePath}?main'`].join('\n');
    }
}