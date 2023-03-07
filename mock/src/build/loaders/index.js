const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getRules(context) {
    return [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compiler: require('./uni-template-compiler'),
                        compilerOptions: {
                            mp: {
                                platform: "mp-weixin",
                                scopedSlotsCompiler: "auto",
                            },
                            filterModules: {},
                            filterTagName: 'wxs',
                        },
                    }
                },
            ]
        },
        {
            test: /\.m?jsx?$/,
            exclude: function (filepath) {
                return /node_modules/.test(filepath)
            },
            use: [
                {
                    loader: "babel-loader"
                }
                // 为什么不使用 options，options有共享问题
                // https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc#:~:text=Babel%20has%20two%20parallel%20config,be%20used%20together%2C%20or%20independently.&text=Given%20that%20information-,.,be%20transformed%2Fchanged%20by%20babel.
            ]
        },
        {
            test: `${context}/main.js`,
            use: [
                {
                    loader: path.resolve(__dirname, 'mp/main.js'),
                    options: {
                        bridge: path.resolve(__dirname, '../../runtime/uni-mp-weixin/index')
                    },
                },
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

module.exports = function (context) {
    return getRules(context);
}