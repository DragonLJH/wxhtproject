<template>
  <div class="binding">
    <el-collapse accordion v-model="activeName" @change="handleChange">
      <el-collapse-item :name="item.username">
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
          <h2>添加微信</h2>
          <div class="apop">
            <el-popover
              placement="right"
              trigger="click"
              @hide="resetAddWX"
              width="200"
            >
              <el-input
                placeholder="请输入微信"
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
            <echartsCard :uname="item.username" :chEch="comEch" />
          </div>
          <div>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
            {{ item.username }}
            <!-- v-show在一开始还没拿到数据（渲染的数据 <==> item.username）就渲染了，采用v-if让数据渲染完成再进去渲染 -->
            <msg v-if="value" :ausername="item.username" />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import echartsCard from "@/components/myecharts/echartsCard.vue";
import msg from "./msg.vue";
export default {
  components: {
    echartsCard,
    msg,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      wxnumbers: [],
      activeName: "",
      addWX: "",
      comEch: "",
      value: false,
    };
  },
  methods: {
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
          this.comEch = new Date().getTime().toString();
          this.value = false;
          console.log("wxnumber", arr);
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
};
</script>

<style scoped>
</style>