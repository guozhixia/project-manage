<template>
  <div class="ele">
     <el-form ref="form" label-width="100px">
      <el-form-item label="角色">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <div class="block">
          <el-cascader :options="options" v-model="value" :props="props" collapse-tags clearable></el-cascader>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="addrole">添加</el-button>
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
      options: [
        // {
        //   value: 1,
        //   label: "统计",
        //   children: [
        //     {
        //       value: 2,
        //       label: "用户分析",
        //       children: [{ value: 4, label: "用户添加分析" }]
        //     },
        //     { value: 3, label: "订单分析" }
        //   ]
        // }
      ]
    };
  },
  //页面一挂载时就获取数据
  mounted(){
      //请求所有的权限
     this.axios.get("getlimit").then(res=>{
       this.options=treelist(res.data.info,0)
     })
  },

  methods:{
      addrole(){
          let obj={title:this.title,limitid:this.value}
          this.axios.post("/addrole",obj).then(res=>{
            console.log(res)
            if(res.data.err_code==200){
              // alert("200")
              //跳转到表单页面
              this.$router.push({name:"rolelist"})
            }else{
              this.title = "";
              this.value = "";
            }
          })
      },
 
  }
}
</script>

<style scoped>
.el-button{
    float: left;
}
</style>