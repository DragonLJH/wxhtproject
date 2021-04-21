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
        <router-view v-if="isRouterAlive" />
      </div>
    </div>
  </div>
</template>

<script>
import adminnav from "@/components/admin/nav";
export default {
  //通过控制router-view 的显示与隐藏，来重渲染路由区域，重而达到页面刷新的效果，show -> flase -> show
  //provide / inject 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  components: { adminnav },
  methods: {
    SIGNOUT() {
      //清空登录缓存，回到登录页面
      sessionStorage.clear();
      this.$router.push("/LRindex");
    },
    //通过控制router-view 的显示与隐藏，来重渲染路由区域，重而达到页面刷新的效果，show -> flase -> show
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
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
