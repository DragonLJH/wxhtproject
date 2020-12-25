<template>
  <div class="LRindex">
    <div class="form">
      <div>
        <h1>登录</h1>
        <el-input placeholder="请输入内容" v-model="uname">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <el-input placeholder="请输入内容" v-model="pwd" type="password">
          <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
        </el-input>
        <el-button type="primary" @click="LRindex">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LRindex",
  data() {
    return {
      uname: "",
      pwd: "",
    };
  },
  methods: {
    LRindex() {
      this.axios
        .get("http://47.115.29.252:8089/queryUserByAcc", {
          params: { username: this.uname },
        })
        .then((response) => {
          let ybid = response.data.id;
          let ybusername = response.data.username;
          let ybpassword = response.data.password;
          console.log(ybid, ybusername, ybpassword);

          if (this.uname === ybusername && this.pwd === ybpassword) {
            if (ybid === 1) {
              this.$router.push("/admin").catch((err) => {
                this.$router.push("/admin");
              });
            } else {
              this.$router.push("/commom").catch((err) => {});
            }
            // 将用户名和密码保存
            sessionStorage.setItem("ybusername", ybusername);
            this.$store.state.username = sessionStorage.getItem("ybusername");
          } else {
            this.uname = "";
            this.pwd = "";
            alert("账号或密码错误，请重新输入");
          }
        });
    },
  },
};
</script>
<style scoped>
.LRindex {
  width: 90%;
  max-width: 1200px;
  text-align: center;
  margin: 0 auto;
}
.LRindex > .form {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px 0px;
  width: 100%;
  max-width: 400px;
  height: 400px;
  box-shadow: #eee 0px 5px 5px;
}

.LRindex > .form >>> .el-input {
  width: 80%;
  margin: 10px 0px;
}

.LRindex > .form >>> .el-button {
  width: 80%;
  margin: 10px 0px;
}
</style>