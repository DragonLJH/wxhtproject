<template>
  <div class="binding">
    <h1 style="text-align: center;">域名管理</h1>
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
      this.axios.get("http://47.115.29.252:8089/queryUser").then((response) => {
        this.data = response.data;
      });
    },
  },
  mounted() {
    this.fetchQueryUser();
  },
};
</script>

<style scoped>
</style>