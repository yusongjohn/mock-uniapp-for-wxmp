module.exports = class {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('a', compilation => {
            compilation.hooks.chunkAsset.tap('b', function (file) {
                const module = [...file.modulesIterable].find(module => /\.vue$/.test(module.userRequest));
                if (!module) return;

                const chunks = [...module.chunksIterable]
                const chunk = chunks && chunks[0]

                if (!chunk) return;

                if (!chunk.entryModule) { // 页面vue是entry，因此自然有，组件vue不是，刚好在这加
                    // 这样做的目的是可以自动执行该模块
                    // 见 lib/web/JsonpChunkTemplatePlugin.js -> getEntryInfo
                    chunk.entryModule = module;
                }
            })
        })
    }
}