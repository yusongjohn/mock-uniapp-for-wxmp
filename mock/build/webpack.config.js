const {appJsonFile} = require("./constant");
const fsExtra = require("fs-extra");
const {getAllPages} = require("./utils");

function getEntry() {
    const mainJsPath = `${context}/main.js`
    const entry = {
        "common/main": mainJsPath
    }

    // 只能是严格的json，条件编译，注释等需要其他库支持，暂遗留
    const appJsonPath = path.resolve(context, appJsonFile);
    const appJson = fsExtra.readJsonSync(appJsonPath);
    const allPages = getAllPages(appJson);

    allPages.forEach(page => {
        entry[page] = `${mainJsPath}?page=${page}`
    })
    return entry;
}

module.exports = {
    entry: getEntry()
}