const path = require('path');
const fsExtra = require("fs-extra");
const {getAllPages} = require("./common/utils");
const webpack = require('webpack')

process.env = {}

function build(context) {
    process.env.context = context;

    const config = require('./buildConfig')(context);

    webpack(config, function (err, result) {
        err && console.error(err)
        console.log('----------------------------')
        result && result.compilation.errors.length && console.error(result.compilation.errors)
        // console.log(result);
    })
}

module.exports = build