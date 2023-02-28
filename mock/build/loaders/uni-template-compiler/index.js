const path = require('path')
const hash = require('hash-sum')
const parser = require('@babel/parser')

const {
    parseComponent,
    compile,
    compileToFunctions,
    ssrCompile,
    ssrCompileToFunctions
} = require('vue-template-compiler')

const traverseScript = require('./script/traverse')
const generateScript = require('./script/generate')
const traverseTemplate = require('./template/traverse')
const generateTemplate = require('./template/generate')

const compilerModule = require('./module')

const generateCodeFrame = require('./codeframe')

const {isComponent, isUnaryTag} = require('./util')

const {
    module: autoComponentsModule,
    compileTemplate
} = require('./auto-components')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = {
    compile(source, options = {}) {
        // 启用摇树优化后,需要过滤内置组件
        (options.modules || (options.modules = [])).push(autoComponentsModule)

        // transformAssetUrls
        options.modules.push(require('./asset-url'))
        options.modules.push(require('./bool-attr'))

        options.isUnaryTag = isUnaryTag
        options.preserveWhitespace = false
        options.modules.push(compilerModule)

        const res = compileTemplate(source, Object.assign(options, {optimize: false}), compile)

        options.mp.platform = require('./mp')();
        options.mp.scopeId = options.scopeId
        options.mp.resourcePath = options.resourcePath
        options.mp.hashId = options.resourcePath ? hash(options.resourcePath) : ''
        options.mp.globalUsingComponents = options.globalUsingComponents || {}
        options.mp.filterModules = Object.keys(options.filterModules || {})
        options.mp.wxComponents = options.wxComponents || Object.create(null)

        const state = {
            ast: {},
            script: '',
            template: '',
            errors: new Set(),
            tips: new Set(),
            options: options.mp
        }

        const ast = parser.parse(`function render(){${res.render}}`)
        let template = '';

        try {
            res.render = generateScript(traverseScript(ast, state), state)
            template = generateTemplate(traverseTemplate(ast, state), state)
        } catch (e) {
            console.error(e)
            throw new Error('Compile failed at ' + options.resourcePath.replace(path.extname(options.resourcePath), '.vue'))
        }

        // res.specialMethods
        // res.files
        // res.generic // resolve scoped slots
        // res.componentGenerics // define scoped slots

        state.errors.forEach(msg => {
            res.errors.push({
                msg
            })
        })

        const resourcePath = options.resourcePath.replace(path.extname(options.resourcePath), '')

        /**
         * TODO
         * 方案0.最佳方案是在 loader 中直接 emitFile，但目前 vue template-loader 不好介入,自定义的 compiler 结果又无法顺利返回给 loader
         * 方案1.通过 loader 传递 emitFile 来提交生成 wxml,需要一个 template loader 来给自定义 compier 增加 emitFile
         * 方案2.缓存 wxml 内容，由 plugin 生成 assets 来提交生成 wxml
         * ...暂时使用方案1
         */
        if (options.emitFile) {
            // updateSpecialMethods

            options.emitFile(options.resourcePath, template)
            if (res.files) {
                Object.keys(res.files).forEach(name => {
                    options.emitFile(name, res.files[name])
                })
            }

            // TODO usingGlobalComponents
            // TODO generic
            // TODO componentGenerics
        } else {
            res.template = template
        }
        return res
    },
    parseComponent,
    compileToFunctions,
    ssrCompile,
    ssrCompileToFunctions,
    generateCodeFrame
}