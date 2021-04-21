<template>
  <div class="Commom">
    <div class="main-top">
      <div class="main-top-left"><h1>YB</h1></div>
      <div class="main-top-right">
        <el-link icon="el-icon-s-tools" :underline="false" @click="SIGNOUT"
          >退出登录</el-link
        >
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ item.username }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text" 
          @click="SWITCH"
          >添加|修改（域名）</el-button
        >
      </div>
      <div v-show="TSHOW">
        <el-input
          placeholder="请输入域名"
          v-model="aDM"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-circle-plus-outline"
            @click="changeDM"
          ></el-button>
        </el-input>
      </div>
      <DMWX :item="item" />
    </el-card>
  </div>
</template>

<script>
import DMWX from "../components/commom/binding";
export default {
  components: { DMWX },
  data() {
    return {
      item: {},
      TSHOW: false,
      aDM: "",
    };
  },
  methods: {
    changeDM() {
      console.log(this.aDM);
      this.axios
        .get("http://localhost:8781/updateUserByAcc", {
          params: { username: this.item.username, domain: this.aDM },
        })
        .then((response) => {
          console.log(response.data);
          console.log(this.aDM);
          if (response.data) {
            alert("域名添加|修改成功");
            this.item.domain = this.aDM;
            this.THEDM = false;
          } else {
            alert("该域名已绑定账户");
            this.THEDM = false;
          }
        });
    },
    //查询该账户信息
    fetchQueryUser() {
      this.axios
        .get("http://localhost:8781/queryUserByAcc", {
          params: {
            username: sessionStorage.getItem("ybusername"),
          },
        })
        .then((response) => {
          this.item = response.data;
          this.aDM = response.data.domain;
        });
    },
    SWITCH() {
      this.TSHOW = !this.TSHOW;
    },
    SIGNOUT() {
      //清空登录缓存，回到登录页面
      sessionStorage.clear();
      this.$router.push("/LRindex");
    },
  },
  mounted() {
    this.fetchQueryUser();
    console.log(sessionStorage.getItem("ybusername"));
  },
};
</script>

<style scoped>
.Commom {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
}
.Commom >>> .box-card {
  width: 100%;
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
  margin: 20px 0px;
  flex: 2;
}
</style>
