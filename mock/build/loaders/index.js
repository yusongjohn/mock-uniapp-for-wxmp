const path = require('path')

function getMpRules(projectDir) {
    return [
        {
            test: `${projectDir}/main.js`,
            use: [
                {
                    loader: "wrap-loader",
                    options: {
                        before: [
                            "import 'uni-pages';",
                            "wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;"
                        ]
                    }
                },
                {
                    loader: path.resolve(__dirname, 'main.js')
                }
            ]
        },
        {
            resourceQuery: /vue&type=script/,
            use: [
                {
                    loader: path.resolve(__dirname, 'script.js')
                }
            ]
        },
        {
            resourceQuery: /vue&type=template/,
            use: [
                {
                    loader: path.resolve(__dirname, 'template.js')
                }
            ]
        },
        // TODO
        // cacheDirectory: "/Users/songyu/tencent/doctor-uni/node_modules/.cache/uni-template-compiler/mp-weixin",
        // cacheIdentifier: "0af8e322",
        // require('f/lib/cache-loader').createTemplateCacheLoader(),
        {
            resourceQuery: [
                /lang=wxs/,
                /lang=filter/,
                /lang=sjs/,
                /blockType=wxs/,
                /blockType=filter/,
                /blockType=sjs/
            ],
            use: [
                {
                    loader: "@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-filter-loader/index.js"
                }
            ]
        }
    ]
}