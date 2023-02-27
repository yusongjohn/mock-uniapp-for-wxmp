const path = require('path');
const fsExtra = require("fs-extra");
const {appJsonFile} = require("./constant");
const {getAllPages} = require("./utils");
const webpack = require('webpack')

function build(context) {
    const config = require('./webpack.config')(context);
    webpack(config, function (err, result) {

        if (err) {
            return console.error(err)
        }
        // console.log(result);
    })
}

build('/Users/songyu/songyu/mock-uniapp-for-wxmp/demo')

module.exports = build