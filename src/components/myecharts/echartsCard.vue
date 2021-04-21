<template>
  <div class="eachats">
    <el-row>
      <el-col :span="24">
        <div :id="uname" style="width: 300px; height: 300px"></div>
      </el-col>
    </el-row>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    uname: String,
    chEch: String,
  },
  data() {
    return {};
  },
  methods: {
    echartsWx(uname) {
      this.$nextTick(function () {
        this.axios
          .get("http://localhost:8781/queryWx", {
            params: {
              username: uname,
            },
          })
          .then((response) => {
            let arr1 = [];
            let arr2 = [];
            let data = response.data;
            data.forEach((val) => {
              arr1.push(val.wxnumber);
              arr2.push(val.number);
            });

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
              document.getElementById(this.uname)
            );
            myChart.hideLoading();
            // 指定图表的配置项和数据
            var option = {
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: arr1,
                  show: false,
                  axisTick: {
                    alignWithLabel: true,
                  },
                },
              ],
              yAxis: [
                {
                  type: "value",
                },
              ],
              series: [
                {
                  name: " ",
                  type: "bar",
                  barWidth: "50%",
                  data: arr2,
                },
              ],
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          });
      });
    },
  },
  mounted() {
    this.echartsWx(this.uname);
  },
  watch: {
    chEch(val) {
      this.echartsWx(this.uname);
    },
  },
};
</script>

<style scoped>
</style>