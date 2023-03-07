const path = require('path');
const parser = require('@babel/parser')
const jsonHandler = require('../../../common/json');
const { resolveFilePath, getBabelParserOptions, addDynamicImport, findBabelLoader } = require('../babel/util');
const { hyphenate, removeExt } = require('../../../common/utils');

module.exports = async function (loaderContext, traverse, { content, resourcePath }) {
    const ast = parser.parse(content, getBabelParserOptions());
    const { state: { components } } = traverse(ast, { components: [] });
    const dynamicImports = Object.create(null)

    return Promise.all(components.map(component => {
        return resolveFilePath.call(loaderContext, component.source).then(resolved => {
            const identifier = component.name = hyphenate(component.name);
            const source = component.source
            const chunkName = component.source = removeExt(path.relative(process.env.context, resolved))
            // 非页面组件才需要 dynamic import
            if (!process.env.allPages.includes(component.source)) {
                dynamicImports[source] = { identifier, chunkName, source }
            }
        })
    })).then(() => {
        const usingComponents = Object.create(null)
        components.forEach(({ name, source }) => usingComponents[name] = `/${source}`)

        const babelLoader = findBabelLoader(loaderContext.loaders)
        if (!babelLoader) {
            throw new Error('mpLoader.findFail: babel-loader');
        }

        // console.log('dynamicImports', dynamicImports)
        addDynamicImport(babelLoader, resourcePath, dynamicImports)

        jsonHandler.updateUsingComponents(resourcePath, usingComponents);
    })
}