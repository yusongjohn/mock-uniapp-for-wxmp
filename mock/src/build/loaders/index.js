const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mpRuntime = path.resolve(__dirname, '../../runtime/uni-mp-weixin/index');


function getRules(context) {
    return [
        {
            test: `${context}/main.js$`,
            use: [
                {
                    loader: "wrap-loader",
                    options: {
                        before: [`import '${mpRuntime}'`]
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
        },
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
                                // https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage
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
        },
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compiler: require('./uni-template-compiler'),
                        compilerOptions: {},
                    }
                },
            ]

        }
    ]
}

module.exports = function (context) {
    return getRules(context);
}