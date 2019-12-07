<template>
  <div class="ele">
    <el-form ref="form" label-width="100px">
      <!-- input框 -->
      <el-form-item label="标题">
        <el-input v-model="title" width="300px"></el-input>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <!-- 多级选项        -->
      <el-form-item label="上级权限">
        <el-cascader v-model="value" :props="{checkStrictly:true}" :show-all-levels="false" :options="options"></el-cascader>
      </el-form-item>
      <!-- 添加按钮 -->
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      name: "",
      value:[],
      options: [
          //默认的一级权限---pid为0
          {
              value:0,//value就是他的id
              label:"一级权限"
          }
        
      ]
    };
  },
  //页面一挂载请求所有权限--分类数据
  mounted(){
      this.axios.get("/getlimit").then(res=>{
        //   console.log(res)
        if(res.data.err_code==200){
            let info=res.data.info
            console.log(info) 
           let Infinitus= this.tree(info,0)
           this.options=[...this.options,...Infinitus]
           console.log(this.options)
        }
      })
  },
  methods:{
      add(){
          let pid=this.value.pop()
          let obj={
              title:this.title,
              name:this.name,
              pid:pid//取出最后一项
          }
        //   console.log(obj)
        //调用 添加的接口
        this.axios.post("/addlimit",obj).then(res=>{//把数据放在obj里面，点击添加时连接后台，把数据传给后台,后台中let {title,name,pid}=req.body接受参数，通过prop接受渲染在页面上
            if(res.data.err_code==200){
                console.log("chvengg")
                this.$router.push({name:"list"})
            }else{//如果不正确就清空
                this.name=""
                this.title=""
            }
        })
      },
      //处理无限极分类的方法
      tree(info,pid){
          let data=[]
          for(let i in info ){
              if(info[i].pid==pid){
                  var x={
                      value:info[i]._id,
                      label:info[i].title,
                      children:this.tree(info,info[i]._id)
                  }
                  //如果没有子权限就删除第一个属性
                  if(x.children.length==0){
                      delete x.children
                  }
                  data.push(x)
              }
          }
          
          return data
      }
  }
};
</script>

<style scoped>
.el-button{
    float: left;
}
</style>