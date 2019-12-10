<template>
    <div>
        <el-button @click="$router.push({'name':'addrole'})">添加权限</el-button>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%" max-height="500">
            <el-table-column fixed prop="_id" label="id"></el-table-column>
            <el-table-column fixed prop="title" label="角色"></el-table-column>

            <!-- 操作 删除 -->
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                <!-- 通过scope.row._id得到id。因为上面的prop接受的是——id，所以这边也写——id -->
                <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
                    type="text"
                    size="small"
                >移除</el-button>
                 <el-button
                    @click.native.prevent="editRow(scope.row._id)"
                    type="text"
                    size="small"
                >修改</el-button>
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
        //   title: "管理员"
        // },
        // {
        //   _id: 2,
        //   title: "程序员"
        // }
      ]
    };
  },
  mounted(){
    this.axios.get("/rolelist").then(res=>{
      this.tableData=res.data.info
    })
  },
  methods: {
    //删除
    deleteRow(index, row, id) {
      this.axios.get("/delrole",{
        params:{
          id:id
        }
      }).then(res=>{
        if(res.data.err_code==200){
            row.splice(index, 1);
        }
      })
    },
    //修改
    editRow(id) {
      this.$router.push({name:"editrole",params:{id:id}})
    }
  }
};
</script>