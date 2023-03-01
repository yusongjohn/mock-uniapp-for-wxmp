const path = require('path')
const jsonHandler = require('../common/json');
const fsExtra = require('fs-extra');
const { appJsonFile } = require('../common/constant');

function emitFile(compilation, filePath, source) {
    compilation.assets[filePath] = {
        size() {
            return Buffer.byteLength(source, 'utf8')
        },
        source() {
            return source
        }
    }
}

const ext = `wxss`;
function generateApp(compilation) {
    const appJs = {
        file: `app.js`,
        source: `require('./common/runtime.js');\nrequire('./common/vendor.js');\nrequire('./common/main.js')`
    }

    let importMainCss = ''
    if (compilation.assets[`common/main.${ext}`]) { // 是否存在 main.css
        importMainCss = `@import './common/main${ext}';`
    }

    let importVendorCss = ''
    if (compilation.assets[`common/vendor${ext}`]) { // 是否存在 vendor.css
        importVendorCss = `@import './common/vendor${ext}';`
    }
    const presetStyle = '[data-custom-hidden="true"],[bind-data-custom-hidden="true"]{display: none !important;}';
    const appWxss = {
        file: `app.wxss`,
        source: `${importMainCss}\n${importVendorCss}\n${presetStyle}`
    }
    return [appJs, appWxss]
}

function generateAppJson(compilationm, context) {
    const appJsonPath = path.resolve(context, appJsonFile);
    const appJson = fsExtra.readJsonSync(appJsonPath);

    const pages = appJson.pages || [];
    appJson.pages = pages.map(page => {
        const pagePath = page.path;
        // 页面json
        jsonHandler.updatePageJson(pagePath, page.style || {});
        return pagePath
    });

    const subPackages = appJson.subpackages || appJson.subPackages || [];
    function handler(subPackage) {
        const { root } = subPackage;
        const pages = subPackage.pages || [];
        subPackage.pages = pages.map(page => {
            const pagePath = `${root}/${page.path}`
            
            // 页面json
            jsonHandler.updatePageJson(pagePath, page.style || {})
            return `${page.path}`
        })
    }

    subPackages.forEach(handler)

    // app.json
    jsonHandler.updatePageJson(`app`, appJson)
}

function generatePageJson(compilation) {

}

function generateJson(compilation, context) {
    generateAppJson(compilation, context);
    generatePageJson(compilation, context);

    const emitFileHandler = (function (compilation) {
        return function (filePath, source) {
            return emitFile(compilation, filePath, source)
        }
    })(compilation);

    jsonHandler.emitAllCacheJson(emitFileHandler);
}

module.exports = class {
    constructor(context) {
        this.context = context;
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise('webpack-uni-mp-emit', compilation => {
            return new Promise((resolve, reject) => {
                // addSubPackagesRequire(compilation)
                // addMPPluginRequire(compilation)
                generateJson(compilation, this.context)

                // app.js, app.wxss
                generateApp(compilation).forEach(({ file, source }) => emitFile(compilation, file, source))

                // generateComponent(compilation, compiler.options.output.jsonpFunction)

                resolve()
            })
        })
    }
}