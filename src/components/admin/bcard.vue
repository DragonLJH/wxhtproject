<template>
  <div class="bcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>域名操作</span>
        <el-link
          type="primary"
          :underline="false"
          style="float: right"
          @click="openDM"
          >修改|添加<i class="el-icon-edit el-icon--right"></i
        ></el-link>
      </div>
      <div class="box-card-main">
        <div>序号：{{ item.id }}</div>
        <div>用户名：{{ item.username }}</div>
        <div>密码：{{ item.password }}</div>
        <div>域名：{{ item.domain }}</div>
        <div>
          uuid：{{ item.onlyuuid }}
          <span v-show="item.onlyuuid == null && aUUID == null">
            <el-tooltip
              class="item"
              effect="dark"
              content="添加唯一uuid"
              placement="right"
            >
              <el-button
                @click="addUUID(item.onlyuuid)"
                size="mini"
                type="primary"
                plain
                icon="el-icon-plus"
                circle
              ></el-button>
            </el-tooltip>
          </span>
        </div>
        <div v-show="THEDM">
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
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: { item: Object },
  data() {
    return {
      aDM: "",
      THEDM: false,
      aUUID: null,
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
    addUUID(uuid) {
      this.axios
        .get("http://localhost:8781/updateUserByAcc2", {
          params: { username: this.item.username, onlyuuid: uuid },
        })
        .then((response) => {
          console.log(response);
          if (response.data) {
            alert("UUID添加成功");
            //调用父组件的方法
            this.$parent.reload();
            this.queryDM();
            // this.item.onlyuuid = this.aUUID;
          } else {
            alert("UUID添加失败");
          }
        });
    },
    openDM() {
      if (this.THEDM === false) {
        this.queryDM();
      }
      this.THEDM = !this.THEDM;
    },
    queryDM() {
      this.axios
        .get("http://localhost:8781/queryUserByAcc", {
          params: { username: this.item.username },
        })
        .then((response) => {
          console.log("queryDM", response.data);
          this.aDM = response.data.domain;
          // this.aUUID = response.data.onlyuuid;
        });
    },
  },
};
</script>

<style scoped>
.bcard {
  width: 100%;
  max-width: 300px;
  display: inline-block;
  margin: 10px;
}

.box-card-main > div {
  border: solid 1px #aaa;
  margin: 5px;
  padding: 5px;
}
</style>