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
        <el-button @click="edit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin:"",
      password:"",
      value:"",
      options:[]
    };
  },
  mounted() {
    //查找所有角色---渲染到下拉列表中
    this.axios.get("/rolelist").then(res=>{
         if(res.data.err_code==200){
             this.options=res.data.info
         }
     })
    //修改 默认数据 --请求接口  ----id
    this.axios.get("/findadmin",{
        params:{
            id:this.$route.params.id
        },
    }).then(res=>{
      console.log(res.data.info)
        if(res.data.err_code==200){
            this.admin=res.data.info.name
            this.password=res.data.info.password
            this.value=res.data.info.roleid 
        }
    })

  },
  methods:{
    edit(id){
      let obj={
        id:this.$route.params.id,
        password:this.password,
        admin:this.admin,
        roleid:this.value
      }
        this.axios.post("/editadmin",obj).then(res=>{
          if(res.data.err_code==200){
            this.$router.push({name:"adminlist"})
          }else{
            alert("error")
          }
        })
    }
  }
};
</script>

<style scoped>
div{
  width: 100%;
}
</style>