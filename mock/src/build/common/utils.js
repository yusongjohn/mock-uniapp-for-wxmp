const path = require('path')
const { appJsonFile } = require("./constant");
const fsExtra = require("fs-extra");
const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

const hyphenateRE = /\B([A-Z])/g

module.exports = {    
    hyphenate: (str) => {
        return str.replace(hyphenateRE, '-$1').toLowerCase()
    },
    normalizePath,
    removeExt(str, ext) {
        if (ext) {
            const reg = new RegExp(ext.replace(/\./, '\\.') + '$')
            return normalizePath(str.replace(reg, ''))
        }
        return normalizePath(str.replace(/\.\w+$/g, ''))
    },
    getAllPages: function () {
        // 只能是严格的json，条件编译，注释等需要其他库支持，暂遗留
        const appJsonPath = path.resolve(process.env.context, appJsonFile);
        const appJson = fsExtra.readJsonSync(appJsonPath);

        if (process.env.allPages) {
            return process.env.allPages
        }

        const allPages = []
        process.env.allPages = allPages
        const pages = appJson.pages || [];
        const subPackages = appJson.subpackages || appJson.subPackages || [];
        allPages.push(...pages.map(page => page.path))

        function handler(subPackage) {
            const { root } = subPackage;
            const pages = subPackage.pages || [];
            allPages.push(...pages.map(page => `${root}/${page.path}`))
        }

        subPackages.forEach(handler)

        process.env.allPages = allPages;
        return allPages;
    },
    getRelativePath: function (currentWorkPath, parentLocalPath, referencePath) {
        let localPath = '';
        if (referencePath) {
            try {
                if (path.isAbsolute(referencePath)) {
                    localPath = path.resolve(currentWorkPath, `${currentWorkPath}/${referencePath}`)
                } else {
                    localPath = path.resolve(path.dirname(parentLocalPath), referencePath)
                }
                referencePath = path.relative(currentWorkPath, localPath);
            } catch (e) {
            }
        }
        return { referencePath, localPath };
    }
}