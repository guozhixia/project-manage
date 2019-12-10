<template>
  <div>
    <el-button @click="$router.push({'name':'add'})">添加权限</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="name" label="路由"></el-table-column>
      <el-table-column fixed prop="pid" label="上级id"></el-table-column>

      <!-- 操作 删除 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- 通过scope.row._id得到id。因为上面的prop接受的是——id，所以这边也写——id -->
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

 <script>
export default {
  methods: {
    deleteRow(index, rows,id) {
    //  console.log(index)//下标
    //  console.log(rows)//
      this.axios.get("/limitdel",{
        params:{
          id:id
        }
      }).then(res=>{
        if(res.data.err_code==200){
           rows.splice(index, 1);
        }
      })
    },
    list(){
        this.axios.get("/getlimit").then(res=>{
        this.tableData=res.data.info
    })
    }
  },
  mounted(){
    this.list()
  },
  data() {
    return {
      tableData: [
        {
          // _id: "1",
          // title: "统计",
          // name: "",
          // pid: 0
        }
      ]
    };
  }
};
</script> 