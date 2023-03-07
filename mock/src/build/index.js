const webpack = require('webpack')

function build(context) {
    process.env.context = context;

    const config = require('./buildConfig')(context);

    webpack(config, function (err, result) { 
        err && console.error(err)
        
        result && result.compilation.errors.length && console.error(result.compilation.errors)
        console.log('----------------------------end')
    })
}

module.exports = build