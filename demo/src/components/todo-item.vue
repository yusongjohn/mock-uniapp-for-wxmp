<template>
  <div class="todo-item">  
    自定义组件名称: {{ name }} <br />
    自定义组件属性值: {{ content }}
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      name: "todo-item",
    };
  },
};
</script>

<style>
.todo-item {
  background: red;
}
</style>
