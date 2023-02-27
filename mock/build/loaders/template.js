const loaderUtils = require('loader-utils')

module.exports = function (content) {
    this.cacheable && this.cacheable()

    const params = loaderUtils.parseQuery(this.resourceQuery)
    debugger
    return content;
}