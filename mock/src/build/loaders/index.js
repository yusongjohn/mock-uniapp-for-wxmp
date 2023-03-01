const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                    loader: path.resolve(__dirname, 'mp/main.js')
                }
            ]
        },
        {
            resourceQuery: /vue&type=script/,
            use: [
                {
                    loader: path.resolve(__dirname, 'mp/script.js')
                }
            ]
        },
        {
            resourceQuery: /vue&type=template/,
            use: [
                {
                    loader: path.resolve(__dirname, 'mp/template.js')
                }
            ]
        }
    ]
}


const getCommonRules = function (context) {
    return [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.m?jsx?$/,
            exclude: function (filepath) {
                return /node_modules/.test(filepath)
            },
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            [
                                "@vue/app",
                                {
                                    "modules": false,
                                    "useBuiltIns": "entry"
                                }
                            ]
                        ]
                    }
                }
            ]
        }
    ]
}

const vueOptions = {
    cacheDirectory: false,
    cacheIdentifier: false,
    transformAssetUrls: false,
    hotReload: false,
    compiler: require('./uni-template-compiler'),
    compilerOptions: {
        preserveWhitespace: false
    }
}

const vueLoaderRules = [
    {
        test: /\.vue$/,
        use: [            
            {
                loader: 'vue-loader',
                options: vueOptions
            },
        ]

    }
]

module.exports = function (context) {
    return [...vueLoaderRules, ...getCommonRules(context), ...getMpRules(context)]
}