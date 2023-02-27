const path = require('path')

function getMpRules(context) {
    return [
        {
            test: `${context}/main.js`,
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
        // {
        //     resourceQuery: /vue&type=template/,
        //     use: [
        //         {
        //             loader: path.resolve(__dirname, 'template.js')
        //         }
        //     ]
        // },
        // {
        //     resourceQuery: [
        //         /lang=wxs/,
        //         /lang=filter/,
        //         /lang=sjs/,
        //         /blockType=wxs/,
        //         /blockType=filter/,
        //         /blockType=sjs/
        //     ],
        //     use: [
        //         {
        //             loader: "@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-filter-loader/index.js"
        //         }
        //     ]
        // }
    ]
}


const getCommonRules = function (context) {
    return [
        {
            test: /\.m?jsx?$/,
            use: [
                {
                    loader: "babel-loader",
                    // options:
                }
            ],
            exclude: /(node_modules)/,
        }
    ]
}

const compiler = require('@dcloudio/uni-template-compiler')
const vueOptions = {
    cacheDirectory: false,
    cacheIdentifier: false,
    compiler
}

const vueLoaderRules = [
    {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: vueOptions
            }
        ]

    }
]

module.exports = function (context) {
    return [...vueLoaderRules, ...getCommonRules(context), ...getMpRules(context)]
}