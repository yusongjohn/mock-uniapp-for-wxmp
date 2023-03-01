- [vue-loader和vue-template-compiler得变更](https://github.com/yusongjohn/mock-uniapp-for-wxmp/pull/1/files)主要是为了支持
  - vue-loader的变化
    - 支持 nvue ，render.js，autocomponents等
    - styleInjection尚未验证
  - vue-template-compiler的变化（vue源码中 dev:compiler命令生成，但是好像没有treeshaking 打包了了很多vue运行时相关的代码）
    - 一元标签：imgage
    - custom block: wxs
    - 忽略这里运行时逻辑的修改 如Dep等

看起来都不是关键变更，暂时使用官方包。
      