const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function () {
    return [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].wxss",
        }),
        new webpack.ProvidePlugin({
            createApp:       [require.resolve('@dcloudio/uni-mp-weixin'), 'createApp'],
            createComponent: [require.resolve('@dcloudio/uni-mp-weixin'), 'createComponent'],
            createPage:      [require.resolve('@dcloudio/uni-mp-weixin'), 'createPage'],
            uni:             [require.resolve('@dcloudio/uni-mp-weixin'), 'default']
        }),
    ]
}