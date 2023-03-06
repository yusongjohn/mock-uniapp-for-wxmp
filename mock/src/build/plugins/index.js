const path = require('path');
const webpack = require('webpack')
const MpPlugin = require('./mp-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SelfExecuteComponent = require('./self-execute-component')

function getCopyPattern(context) {
    const dist = path.resolve(`${context}/../dist`);
    const copyFiles = ['project.config.json', 'sitemap.json'] // 'project.private.config.json'
    return copyFiles.map(file => {
        return {
            from: `${context}/${file}`,
            to: dist
        }
    });
}
const mpRuntime = path.resolve(__dirname,'../../runtime/uni-mp-weixin/index');
module.exports = function (context) {
    return [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new CopyPlugin(getCopyPattern(context)),
        new MiniCssExtractPlugin({filename: "[name].wxss"}),
        new webpack.ProvidePlugin({
            createApp:       [mpRuntime, 'createApp'],
            createComponent: [mpRuntime, 'createComponent'],
            createPage:      [mpRuntime, 'createPage'],
            uni:             [mpRuntime, 'default']
        }),
        new MpPlugin(context),
        new SelfExecuteComponent(),
    ]
}