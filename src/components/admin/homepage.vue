<template>
  <div class="homepage">
    <h1 style="text-align: center">微信管理</h1>
    <div>
      <el-collapse accordion v-model="activeName" @change="handleChange">
        <el-collapse-item
          v-for="(item, index) in data"
          :key="index"
          :name="item.username"
          v-show="item.id === 1 ? false : true"
        >
          <template slot="title">
            <div style="width: 100%; display: inline-flex">
              <span style="flex: 1; line-height: 1rem">
                账号：{{ item.username }}
              </span>
              <span style="flex: 1; line-height: 1rem">
                域名：{{ item.domain }}
              </span>
            </div>
          </template>
          <div>
            <div class="apop">
              <el-popover
                placement="right"
                trigger="click"
                @hide="resetAddWX"
                width="200"
              >
                <el-input
                  placeholder="请输入内容"
                  v-model="addWX"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-circle-plus-outline"
                    @click="addNWX"
                  ></el-button>
                </el-input>

                <el-button
                  style="margin: 10px 20px"
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  size="small"
                  slot="reference"
                ></el-button>
              </el-popover>
            </div>
            <el-tag
              v-for="(value, index) in wxnumbers"
              :key="index"
              closable
              style="margin: 10px 20px"
              @close="delWX(value)"
            >
              {{ value }}
            </el-tag>

            <div>
              <echartsCard :uname="item.username" :chEch="chEch" />
            </div>

            <div>
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
              {{ item.username }}
              <msg v-show="value" :ausername="item.username" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div></div>
  </div>
</template>

<script>
import echartsCard from "@/components/myecharts/echartsCard.vue";
import msg from "@/components/commom/msg.vue";

export default {
  components: {
    echartsCard,
    msg,
  },
  data() {
    return {
      data: [{ id: 0, username: "", password: "", domain: "" }],
      wxnumbers: [],
      activeName: "",
      addWX: "",
      chEch: "",
      value: false,
    };
  },
  methods: {
    //查询全部账户
    fetchQueryUser() {
      this.axios.get("http://localhost:8781/queryUser").then((response) => {
        this.data = response.data;
      });
    },
    //打开折叠面板显示微信
    handleChange(val) {
      console.log("val", val);
      this.axios
        .get("http://localhost:8781/queryWx", {
          params: {
            username: val.trim(),
          },
        })
        .then((response) => {
          let arr = [];
          let data = response.data;
          data.forEach((val) => {
            arr.push(val.wxnumber);
          });
          this.wxnumbers = arr;
          this.chEch = new Date().getTime().toString();
          this.value = false;
          console.log("val", val);
        });
    },
    //删除微信
    delWX(number) {
      console.log("activeName", this.activeName);
      console.log("wxnumber", number);
      this.axios
        .get("http://localhost:8781/delectWx", {
          params: {
            username: this.activeName,
            wxnumber: number,
          },
        })
        .then((response) => {
          if (response.data) {
            alert("删除成功");
          } else {
            alert("删除失败");
          }
          this.handleChange(this.activeName);
        });
    },
    //添加微信
    addNWX() {
      if (this.addWX.trim() === "") {
        alert("输入的微信为空\n请输入正确的微信号");
      } else {
        //判断是否存在中文字符/.*[\u4e00-\u9fa5]+.*$/.test()
        if (/.*[\u4e00-\u9fa5]+.*$/.test(this.addWX.trim())) {
          alert("输入的微信带有中文\n请输入正确的微信号");
          this.addWX = "";
        } else {
          this.axios
            .get("http://localhost:8781/creatWx", {
              params: {
                username: this.activeName,
                wxnumber: this.addWX.trim(),
              },
            })
            .then((response) => {
              if (response.data) {
                alert("添加成功");
              } else {
                alert("添加失败");
              }
              this.handleChange(this.activeName);
              this.resetAddWX();
            });
        }
      }
    },
    //清空添加微信的输入框
    resetAddWX() {
      this.addWX = "";
    },
  },
  mounted() {
    this.fetchQueryUser();
  },
};
</script>

<style scoped>
</style>