<template>
  <div class="admin-nav">
    <el-menu
      default-active="/admin/homepage"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <el-menu-item index="/admin/homepage">
        <i class="el-icon-menu"></i>
        <span slot="title">微信管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/add-wx">
        <i class="el-icon-document"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/binding">
        <i class="el-icon-setting"></i>
        <span slot="title">域名管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      screenWidth: "",
      screenHeight: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    check() {
      if (document.body.clientWidth > 600) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    this.check();
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        this.check();
      })();
    };
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  height: 100%;
}
</style>