<template>
  <div class="add-wx">
    <h1 style="text-align: center;">账户管理</h1>
    
    <el-table :data="data">
      <el-table-column label="序号" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.id !== 1">
            <i class="el-icon-caret-right"></i>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          <span v-if="scope.row.id !== 1"
            ><i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{
              scope.row.username
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="密码">
        <template slot-scope="scope">
          <span v-if="scope.row.id !== 1">
            <i class="el-icon-lock"></i>
            <span style="margin-left: 10px">{{
              scope.row.password
            }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span v-if="scope.row.id !== 1">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除<i class="el-icon-delete el-icon--right"></i> </el-button
            ></span
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="addS">
      <el-button type="text" @click="dialogVisible = true">添加账户<i class="el-icon-upload el-icon--right"></i></el-button>

      <el-dialog :visible.sync="dialogVisible" center width="100%">
        <div class="addS-main">
          <h1>添加账户</h1>
          <p>
            <el-input
              v-model="username"
              required
              placeholder="请输入账号"
            ><i slot="suffix" class="el-input__icon el-icon-user"></i></el-input>
          </p>
          <p>
            <el-input
              v-model="password"
              required
              placeholder="请输入密码"
            ><i slot="suffix" class="el-input__icon el-icon-lock"></i></el-input>
          </p>
          <p>
            <el-button type="primary" @click="addUser" style="width: 100%"
              >提交</el-button
            >
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],//全部账户显示的数据
      dialogVisible: false,//弹窗
      username: "",//用户名
      password: "",//密码
    };
  },
  methods: {
    //删除账户连带微信一起删除
    handleDelete(index, row) {
      console.log(index, row.username);
      new Promise((resolve, reject) => {
        this.axios
          .get("http://localhost:8781/delectUser", {
            params: { username: row.username },
          })
          .then((response) => {
            if (response.data) {
              this.fetchQueryUser();
              resolve(true);
              alert("删除成功");
            } else {
              alert("删除失败");
            }
          });
      }).then((val) => {
        //判断账户是否删除成功，微信删除失败可能是因为该账户上没有存在微信
        if (val) {
          this.axios
            .get("http://localhost:8781/delectAllWx", {
              params: { username: row.username },
            })
            .then((response) => {
              if (response.data) {
                alert("账户微信删除成功");
              } else {
                alert("账户微信删除失败");
              }
            });
        }
      });
      // this.axios
      //   .get("http://localhost:8781/delectUser", {
      //     params: { username: row.username },
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.fetchQueryUser();
      //       alert("删除成功");
      //     } else {
      //       alert("删除失败");
      //     }
      //   });
      // this.axios
      //   .get("http://localhost:8781/delectWx", {
      //     params: { username: row.username },
      //   })
      //   .then((response) => {
      //     if (response.data) {
      //       this.fetchQueryUser();
      //       alert("删除成功");
      //     } else {
      //       alert("删除失败");
      //     }
      //   });
    },
    //清空输入框
    resetUser() {
      this.username = "";
      this.password = "";
    },
    //添加账户
    addUser() {
      //账户名和密码不能为空
      if (this.username.trim() !== "" && this.password.trim() !== "") {
        this.axios
          .get("http://localhost:8781/creatUser", {
            params: {
              username: this.username.trim(),
              password: this.password.trim(),
            },
          })
          .then((response) => {
            if (response.data) {
              this.dialogVisible = false;
              this.fetchQueryUser();
              this.resetUser();
              alert("添加账户成功");
            } else {
              alert("账户已存在，添加失败");
              this.dialogVisible = false;
              this.fetchQueryUser();
              this.resetUser();
            }
          });
      } else {
        alert("账号或者密码不能为空");
      }
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
  },
};
</script>

<style scoped>
.add-wx {
  width: 100%;
}
.add-wx >>> .el-table {
  width: 100%;
}

.addS >>> .el-dialog {
  display: flex;
  justify-content: center;
}
.addS >>> .el-dialog > div {
  text-align: center;
}

/*媒体查询，监听页面宽度决定弹窗的样式*/
@media screen and (max-width: 600px) {
  .addS >>> .el-dialog {
    justify-content: left;
  }
  .addS >>> .el-dialog > div {
    text-align: left;
  }
  .addS >>> .el-dialog .addS-main {
    border: solid 1px #aaa;
    box-shadow: #aaa 0px 5px 5px;
    padding: 10px 30px 20px 30px;
  }
}
</style>