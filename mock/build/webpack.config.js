const {appJsonFile} = require("./constant");
const fsExtra = require("fs-extra");
const loaderUtils = require('loader-utils')
const {getAllPages} = require("./utils");
const path = require('path')

function getEntry(context) {
    const mainJsPath = `${context}/main.js`
    const entry = {
        "common/main": mainJsPath
    }

    // 只能是严格的json，条件编译，注释等需要其他库支持，暂遗留
    const appJsonPath = path.resolve(context, appJsonFile);
    const appJson = fsExtra.readJsonSync(appJsonPath);
    const allPages = getAllPages(appJson);

    allPages.forEach(page => {
        entry[page] = `${mainJsPath}?page=${page}`
    })
    return function () {
        return entry
    };
}

module.exports = function (context) {
    return {
        entry: getEntry(context),
        output: {
            chunkFilename: "[id].js",
            filename: "[name].js",
            globalObject: "global",
            path: path.resolve(context, 'dist'),
            publicPath: "/"
        },
        module: {
            noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
            rules: require('./loaders/index')(context)
        },
        plugins: require('./plugins/index')(context)
    }
}