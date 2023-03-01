const pageJsonCache = {} // app.json 和 xxxPage.json

class JsonHandler {
    getPageJson(filePath) {
        if (!pageJsonCache[filePath]) {
            pageJsonCache[filePath] = {}
        }
        return pageJsonCache[filePath];
    }

    updatePageJson(filePath, extend = {}) {
        const pageJson = this.getPageJson(filePath);
        Object.assign(pageJson, extend);
    }

    updateUsingComponents(filePath, components) {
        const pageJson = this.getPageJson(filePath);
        const before = pageJson.usingComponents || {};
        pageJson.usingComponents = Object.assign({}, before, components)
    }

    emitAllCacheJson(emitFile) {
        for (const key in pageJsonCache) {
            emitFile(`${key}.json`, JSON.stringify(pageJsonCache[key]))
        }
    }
}

module.exports = new JsonHandler()