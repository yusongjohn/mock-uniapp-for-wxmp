const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function () {
    return [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].wxss",
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            createApp:       [require.resolve('@dcloudio/uni-mp-weixin'), 'createApp'],
            createComponent: [require.resolve('@dcloudio/uni-mp-weixin'), 'createComponent'],
            createPage:      [require.resolve('@dcloudio/uni-mp-weixin'), 'createPage'],
            uni:             [require.resolve('@dcloudio/uni-mp-weixin'), 'default']
        }),
    ]
}