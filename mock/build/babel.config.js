module.exports = {
    "presets": [
        [
            "@vue/app",
            {
                "modules": false,
                "useBuiltIns": "entry"
            }
        ]
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "@dcloudio/uni-ui"
            }
        ]
    ]
}