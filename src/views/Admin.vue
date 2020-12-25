<template>
  <div class="Admin">
    <div class="nav"><adminnav /></div>

    <div class="main">
      <div class="main-top">
        <div class="main-top-left"><h1>YB</h1></div>
        <div class="main-top-right">
          <el-link icon="el-icon-s-tools" :underline="false" @click="SIGNOUT"
            >退出登录</el-link
          >
        </div>
      </div>
      <div class="rv">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import adminnav from "@/components/admin/nav";
export default {
  components: { adminnav },
  methods: {
    SIGNOUT() {
      //清空登录缓存，回到登录页面
      sessionStorage.clear();
      this.$router.push("/LRindex");
    },
  },
  mounted() {
    console.log(sessionStorage.getItem("ybusername"));
  },
};
</script>

<style scoped>
.Admin {
  display: flex;
  overflow: hidden;
}
.Admin > .nav {
  flex: 1;
  box-shadow: #999 0px 15px 15px;
}

.Admin > .main {
  flex: 9;
}

.main-top {
  display: flex;
  justify-content: left;
  box-shadow: #aaa 5px 5px 5px;
  margin: 5px 0px 5px 5px;
  padding: 0px 10px;
}
.main-top-left {
  flex: 8;
}
.main-top-right {
  flex: 2;
}
</style>
