<template>
  <div>
    <el-button @click="$router.push({'name':'addadmin'})">添加管理员</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="name" label="管理员名"></el-table-column>
      <el-table-column fixed prop="password" label="管理员密码"></el-table-column>
      <el-table-column fixed prop="jsid" label="角色id"></el-table-column>
      <el-table-column fixed prop="jsname" label="角色名"></el-table-column>

      <!-- 操作 删除 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>

          <el-button @click.native.prevent="editRow(scope.row._id)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // {
        //   _id: 1,
        //   admin: "高岗",
        //   jsid: 2
        // }
      ]
    };
  },
  mounted() {
    this.axios.get("/getperson").then(res => {
      console.log(res);
      this.tableData = res.data.info;
    });
  },
  methods: {
    editRow(id) {
      // 跳转到 修改页面
    },
    deleteRow(index, row, id) {}
  }
};
</script>