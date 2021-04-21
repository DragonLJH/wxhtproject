<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" min-width="50">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" min-width="50">
        <template slot-scope="scope">
          <i class="el-icon-location-information"></i>
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" min-width="50">
        <template slot-scope="scope">
          <i class="el-icon-s-promotion"></i>
          <span style="margin-left: 10px">{{ scope.row.complete }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" min-width="50">
        <template slot-scope="scope">
          <i class="el-icon-s-flag"></i>
          <span style="margin-left: 10px">{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信" min-width="50">
        <template slot-scope="scope">
          <i class="el-icon-s-management"></i>
          <span style="margin-left: 10px">{{ scope.row.wxnumber }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    ausername: String,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    queryMsg(name) {
      this.axios
        .get("http://localhost:8781/queryMsg", {
          params: {
            username: name,
          },
        })
        .then((response) => {
          let data = response.data;
          this.tableData = data;
          console.log(data);
        });
    },
  },
  mounted() {
    console.log("msg",this.ausername)
    if (this.ausername === "" || this.ausername === "admin") {
    } else {
      this.queryMsg(this.ausername);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>