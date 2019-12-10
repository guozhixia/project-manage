<template>
  <div class="ele">
     <el-form ref="form" label-width="100px">
      <el-form-item label="管理员名">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <div class="block">
          <el-cascader :options="options" v-model="value" :props="props" collapse-tags clearable></el-cascader>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="edit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import treelist from "@/Myjs/tree.js"
export default {
     data() {
    return {
      title: "",
      props: { multiple: true, checkStrictly: true },
      value: [],
      options: []
    };
  },
  //页面一挂载时就获取数据
  mounted(){
      //请求所有的权限
     this.axios.get("/getlimit").then(res=>{
       this.options=treelist(res.data.info,0)
     })

     this.axios.get("/roleinfo",{
         params:{
             id:this.$route.params.id
         }
     }).then(res=>{
         if(res.data.err_code==200){
             this.title=res.data.info.title,
             this.value=res.data.info.changeid
         }
     })
  },

  methods:{
    //   addrole(){
    //       let obj={title:this.title,limitid:this.value}
    //       this.axios.post("/addrole",obj).then(res=>{
    //         console.log(res)
    //         if(res.data.err_code==200){
    //           alert("200")
    //           //跳转到表单页面
    //           this.$router.push({name:"rolelist"})
    //         }else{
    //           this.title = "";
    //           this.value = "";
    //         }
    //       })
    //   },
        edit(){
            let obj={
                title:this.title,
                id:this.$route.params.id,
                limitid:this.value
            }
            // console.log(obj)
            this.axios.post("/roledit",obj).then(res=>{
                // console.log(res)
                if(res.data.err_code==200){
                    this.$router.push({name:"rolelist"})
                }
            })
        }
  }
}
</script>

<style scoped>
.el-button{
    float: left;
}
</style>