const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = {
    normalizePath,
    removeExt(str, ext) {
        if (ext) {
            const reg = new RegExp(ext.replace(/\./, '\\.') + '$')
            return normalizePath(str.replace(reg, ''))
        }
        return normalizePath(str.replace(/\.\w+$/g, ''))
    },
    getAllPages: function (appJson) {
        const pages = appJson.pages || [];
        const subPackages = appJson.subpackages || appJson.subPackages || [];
        const allPages = [...pages]

        function handler(subPackage) {
            const {root} = subPackage;
            const pages = subPackage.pages || [];
            allPages.push(...pages.map(page => `${root}/${page}`))
        }

        subPackages.forEach(handler)
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
        return {referencePath, localPath};
    }
}