<template>
  <div class="binding">
    <h1 style="text-align: center">域名管理</h1>
    <bcard
      v-for="(val, index) in data"
      :key="index"
      :item="val"
      v-show="val.id != 1"
    />
  </div>
</template>

<script>
import bcard from "./bcard.vue";
export default {
  //provide / inject 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
  inject: ["reload"],
  components: { bcard },
  data() {
    return {
      data: [], //全部账户显示的数据
    };
  },
  methods: {
    checkDomain(url) {
      //获取域名的正则表达式
      var pattern = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      var array = url.match(pattern);
      console.log(array);
    },
    //查询全部账户
    fetchQueryUser() {
      this.axios.get("http://localhost:8781/queryUser").then((response) => {
        this.data = response.data;
      });
    },
  },
  mounted() {
    this.fetchQueryUser();
    // this.reload();
  },
};
</script>

<style scoped>
</style>