import Vue from 'vue';
import App from './App.vue';

// 解析全局组件
// 将 import todoItem from './components/todo-item.vue' 转换为如下代码
// Vue.component('todo-item')
function noUsedWrapper(){ // 否则会document.create啊，这是必要的
    import('./components/todo-item.vue' /* webpackChunkName: "components/todo-item" */)
}

const app = new Vue({
    ...App,
});
// TODO 
// createApp应该在loader中做转换即 app.$mount -> createApp(app).$mount，
// 暂不处理
createApp(app).$mount();
