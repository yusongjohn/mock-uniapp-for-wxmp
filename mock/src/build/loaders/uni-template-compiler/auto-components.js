function compileTemplate(source, options, compile) {
    // 解析auto components
    return compile(source, options)
}

const compilerModule = {
    preTransformNode(el, options) {
        // (options.isUnaryTag.autoComponents || (options.isUnaryTag.autoComponents = new Set())).add(el.tag)
    }
}
module.exports = {
    compileTemplate,
    module: compilerModule
}
