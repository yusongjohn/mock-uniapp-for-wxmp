<template>
  <div class="scoped-compo">  
    局部组件: {{ name }} <br />
    属性值: {{ content }}
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      name: "scoped-compo",
    };
  },
};
</script>

<style>
.scoped-compo {
  background: red;
}
</style>
