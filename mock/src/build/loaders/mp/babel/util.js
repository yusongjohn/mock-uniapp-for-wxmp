const t = require('@babel/types');

function findImportDeclaration(identifierName, path) {
  const binding = path.scope.getBinding(identifierName)
  if (!binding) {
    return
  }

  if (t.isImportDeclaration(binding.path.parent)) {
    return binding.path.parentPath
  }
}

const babelPluginDynamicImport = require.resolve('./plugin-dynamic-import');

module.exports = {
  findBabelLoader: function (loaders) {
    return loaders.find(loader => loader.path.indexOf('babel-loader') !== -1)
  },
  addDynamicImport: function (babelLoader, resourcePath, dynamicImports) {
    babelLoader.options = babelLoader.options || {};
    if (!babelLoader.options.plugins) {
      babelLoader.options.plugins = [];
    }
    babelLoader.options.plugins.push([babelPluginDynamicImport, {
      resourcePath,
      dynamicImports
    }])
  },
  resolveFilePath: function (source) {
    return new Promise((resolve, reject) => {
      this.resolve(this.context, source, (err, filepath) => {
        if (err) {
          reject(err)
          return
        }

        resolve(filepath)
      })
    })
  },
  parseComponents: function (names, path) {
    const components = []
    const dynamicImportMap = new Map()
    names.forEach(({ name, value }) => {
      const importDeclaration = findImportDeclaration(value, path)
      if (!importDeclaration) {
        throw new Error(`mpLoader.componentReferenceErrorOnlySupportImport ${name}`)
      }
      let source = importDeclaration.node.source.value;

      const dynamicImportArray = dynamicImportMap.get(importDeclaration) || []
      dynamicImportArray.push({ name, value, source })
      dynamicImportMap.set(importDeclaration, dynamicImportArray)
    })

    const importDeclarations = dynamicImportMap.keys()
    for (const importDeclaration of importDeclarations) {
      const dynamicImportArray = dynamicImportMap.get(importDeclaration)
      dynamicImportArray.forEach((dynamicImport) => components.push(dynamicImport))
      importDeclaration.remove()
    }
    return components
  },
  getBabelParserOptions: function () {
    return {
      sourceType: 'module',
      plugins: [
        ['pipelineOperator', { proposal: 'minimal' }],
        'doExpressions',
        'optionalChaining',
        'typescript',
        ['decorators', {
          decoratorsBeforeExport: true
        }],
        'classProperties'
      ]
    }
  }
}

