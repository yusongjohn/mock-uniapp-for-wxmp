<template>
  <div class="global-compo">  
    全局组件: {{ name }} <br />
    属性值: {{ content }}
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      name: "global-compo",
    };
  },
};
</script>

<style>
.global-compo {
  background: red;
}
</style>
