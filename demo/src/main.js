import Vue from 'vue';
import App from './App.vue';

import globalCompo from './components/global-compo.vue'
// 解析全局组件
// 将 import todoItem from './components/todo-item.vue' 转换为如下代码
// Vue.component('todo-item')
// function noUsedWrapper(){ // 否则会document.create啊，这是必要的，而且子组件的加载也是应该由框架加载，而不是有其他页面触发
//     import('./components/todo-item.vue' /* webpackChunkName: "components/todo-item" */)
// }

Vue.component('global-compo', globalCompo);

const app = new Vue({
    ...App,
});
// TODO 
// createApp应该在loader中做转换即 app.$mount -> createApp(app).$mount，
// 暂不处理
wx.createApp(app).$mount();
