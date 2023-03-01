const path = require('path')
const getRules = require('./loaders/index');
const getPlugins = require('./plugins/index');
const { getAllPages } = require("./common/utils");
const splitChunks = require('./split-chunks')

function getEntry(context) {
    const mainJsPath = `${context}/main.js`
    const entry = {
        "common/main": mainJsPath
    }
    const allPages = getAllPages();
    allPages.forEach(page => entry[page] = `${context}/${page}.vue`)
    return entry;
}

module.exports = function (context) {
    const config = {
        mode: "development",
        devtool: false,
        entry: getEntry(context),
        output: {
            chunkFilename: "[id].js",
            filename: "[name].js",
            globalObject: "global",
            path: path.resolve(context, '../dist'),
            publicPath: "/"
        },
        module: {
            noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
            rules: getRules(context)
        },
        plugins: getPlugins(context),
        resolve: {
            alias: {
                "./@": context,
                "@": context,
                "uni-pages": `${context}/app.json`,
                "vuex": path.resolve(__dirname, "../runtime/vuex3/vuex.common.js"),
                "vue$": path.resolve(__dirname, "../runtime/mp-vue/mp.runtime.esm.js")
            },
            extensions: [".mjs", ".js", ".jsx", ".@dcloudio", ".json", ".wasm", ".nvue"],
            modules: [
                "node_modules"
            ]
        },
        resolveLoader: {
            alias: {}
        },
        optimization: {
            namedModules: false,
            noEmitOnErrors: false,
            runtimeChunk: {
                name: 'common/runtime'
            },
            splitChunks
        },
        watch: true
    }
    return config

}