# test
- cd mock/src 
- yarn 
- node ./test.js

# remark
- 主要是研究uniapp如何支持vue2.0 转 小程序，当前实现的过程并不会兼容uniapp写法的小程序

- 去除了部分特性
  - auto components
  - wxs block
  - wxcomponents
  - global components
  - 静态资源、scss/less等

- 变更的写法
  - pages.json -> app.json（尽可能少因为重新定义新的写法而增加额外的处理，除非十分必要）
    - app.json 对微信原生也有部分修改，是为了支持自定义style

# todo
- main.js createApp，目前有问题
- 组件构建

## 待深入
- runtime/uni-mp-weixin（小程序需要的运行时）
  - createApp、createPage等等
  - 事件
  - data diff
  - 虚拟DOM移除 等等
- 模板编译
- runtime/mp-vue（vue 运行时）

# summary
1. 模板编译部分，uniapp当前实现不够优雅
2. 构建部分整体逻辑还是很清晰的，难点主要在于模板编译即如何将vue模板转换为小程序视图层语法
3. 运行时不可忽视，分为纯vue运行时（最主要的变化是去除了虚拟DOM，dom-diff -> data diff），以及连接vue和小程序的运行时