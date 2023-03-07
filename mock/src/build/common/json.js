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
        let mergedUsingComponents
        
        if (extend.usingComponents) {
            const beforeUsingComponents = pageJson.usingComponents || {};
            mergedUsingComponents = Object.assign({}, beforeUsingComponents, extend.usingComponents || {})
        }
        Object.assign(pageJson, extend);

        if (mergedUsingComponents) {
            pageJson.usingComponents = mergedUsingComponents;
        }
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