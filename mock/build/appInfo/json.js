const pageJsonCache = {} // app.json 和 xxxPage.json
module.exports = {
    // filePath: relative to src
    updateUsingComponents(components, filePath) {
        if (!pageJsonCache[filePath]) {
            pageJsonCache[filePath] = {}
        }
        Object.assign(pageJsonCache, components)
    },
    getUsingComponents(filePath) {
        return pageJsonCache[filePath]
    }
}