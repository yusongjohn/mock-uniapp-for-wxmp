const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const { parseComponents } = require('./util')

function handleObjectExpression(declaration, path, state) {
  const res = declaration.properties.filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.key) && prop.key.name === 'components')
  const componentsProperty = res[0]

  if (componentsProperty && t.isObjectExpression(componentsProperty.value)) {
    handleComponentsObjectExpression(componentsProperty.value, path, state)
  }
}

function handleComponentsObjectExpression(componentsObjExpr, path, state) {
  const properties = componentsObjExpr.properties.filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.value))
  const components = parseComponents(properties.map(prop => ({
    name: prop.key.name || prop.key.value,
    value: prop.value.name
  })), path)
  state.components = components;
}

module.exports = function (ast, state = { type: 'Component', components: [], options: {} }) {
  babelTraverse(ast, {
    ExportDefaultDeclaration(path) {
      const declaration = path.node.declaration
      if (t.isObjectExpression(declaration)) { // export default {components:{}}
        handleObjectExpression(declaration, path, state)
      }
    }
  })
  return { ast, state }
}
