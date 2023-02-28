const path = require('path');
const fsExtra = require("fs-extra");
const {appJsonFile} = require("./constant");
const {getAllPages} = require("./utils");
const webpack = require('webpack')

process._globalInfo = {}

function build(context) {
    const config = require('./webpack.config')(context);
    process._globalInfo.context = context;

    webpack(config, function (err, result) {
        err && console.error(err)
        console.log('----------------------------')
        result.compilation.errors.length && console.error(result.compilation.errors)
        // console.log(result);
    })
}

build('/Users/songyu/songyu/mock-uniapp-for-wxmp/demo')

module.exports = build