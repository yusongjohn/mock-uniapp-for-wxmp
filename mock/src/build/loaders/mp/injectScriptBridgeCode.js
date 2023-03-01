module.exports = function (code) {
    code = [code, `; wx.createPage(script)`]
    debugger
    return code.join('\n')
}