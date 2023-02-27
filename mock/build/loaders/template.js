const loaderUtils = require('loader-utils')

module.exports = function () {
    this.cacheable && this.cacheable()

    const params = loaderUtils.parseQuery(this.resourceQuery)
    
}