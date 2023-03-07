<template>
  <div id="app" class="container">
    <div>static node</div>

    <global-compo :content="content"></global-compo>
    
    <scoped-compo :content="content"></scoped-compo>

    <span @click="clickHandler" :class="{ active: showSpan }">
      可以点击啊：<span v-if="showSpan">show span</span>
      <span v-else>hide span</span>
    </span>

    <div style="background: lightblue">
      for循环:
      <block v-for="(item, index) in items">
        <span> {{ item }}、</span>
      </block>
    </div>

    <input v-model="searchText" class="input" />
  </div>
</template>
<script>
import scopedCompo from "../../components/scoped-compo.vue";

export default {
  data() {
    return {
      content: "test content",
      showSpan: true,
      searchText: "请输入内容",
      items: ["a", "b", "c"],
    };
  },
  components: {
    "scoped-compo": scopedCompo,
  },
  watch: {
    searchText() {
      console.log("searchText", this.searchText);
      this.content = this.searchText;
    },
  },
  methods: {
    clickHandler() {
      this.showSpan = !this.showSpan;

      uni.navigateTo({
        url: "/pages/sub/sell/index",
      });
    },
  },
};
</script>

<style>
.container {
  border: 1px solid red;
}

.input {
  border: 1px solid green;
}

.active {
  background: lightgray;
}
</style>
