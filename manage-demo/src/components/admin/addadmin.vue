<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="管理员名">
        <el-input v-model="admin"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="password"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    {{value}}
  </div>
</template>


<script>
import treelist from "@/Myjs/tree.js"
export default {
     data() {
    return {
      admin: "",
      password:"",
      value: "",
      options: []
    };
  },
  //页面一挂载时就获取数据
  mounted(){
      //请求所有的权限---获取角色列表---下拉框要显示
     this.axios.get("/rolelist").then(res=>{
         if(res.data.err_code==200){
             this.options=res.data.info
            // console.log(res.data.info)
         }
     })
  },

  methods:{
      add(){
          let obj={admin:this.admin,password:this.password,roleid:this.value}
          this.axios.post("/addperson",obj).then(res=>{
            // console.log(res)
            if(res.data.err_code==200){
              // alert("200")
              //跳转到表单页面
              this.$router.push({name:"adminlist"})
            }
          })
      },

  }
}
</script>

<style scoped>
div{
  width: 100%;
}
.el-button{
    float: left;
}
</style>