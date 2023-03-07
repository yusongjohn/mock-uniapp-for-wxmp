const babelTemplate = require('@babel/template').default

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const dynamicImport = state.opts.dynamicImports[path.node.source.value]
        console.log(state.opts, path.node.source.value, dynamicImport);
        if (dynamicImport) {
          const name = path.node.specifiers[0].local.name;
          const source = dynamicImport.source;
          const chunkName = dynamicImport.chunkName;

          const tempalte = `var ${name} = function(){ import("${source}" /* webpackChunkName: "${chunkName}" */) }`;
          const insertAst = babelTemplate.ast(tempalte, { preserveComments: true });

          path.insertBefore(insertAst);
          path.remove();
        }
      }
    }
  }
}
