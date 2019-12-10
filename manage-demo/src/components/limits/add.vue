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
import treelist from "@/Myjs/tree.js"
export default {
  data() {
    return {
      title: "",
      name: "",
      value:[],
      options: [
          //默认的一级权限---pid为0
          // {
          //     value:0,//value就是他的id
          //     label:"一级权限"
          // }
        
      ]
    };
  },
  //页面一挂载请求所有权限--分类数据
  mounted(){
    this.axios.get("/getlimit").then(res=>{
      this.options=treelist(res.data.info,0)
    })
      // this.axios.get("/getlimit").then(res=>{
      //   //   console.log(res)
      //   if(res.data.err_code==200){
      //       let info=res.data.info
      //       // console.log(info) 
      //      let Infinitus= this.tree(info,0)
      //      this.options=[...this.options,...Infinitus]//数组合并
      //     //  console.log(this.options)
      //   }
      // })
  },
  methods:{
    //添加的思路：点击添加时，把添加的数据放对obj里面，在连接接口时把obj传过去，放到数据库里面，
    //           前台连接数据库时，如果连接成功就跳转到list页面，list页面获取到后台的数据，通过prop渲染到页面上
    //处理无限极分类的方法：用一个tree方法处理数据，页面一加载时就执行这个方法，让添加的标题显示在页面上、
    //                    在页面挂载时 获取到后台的数据并赋给info，执行tree这个方法，并传参，执行的结果赋给Infinitus，合并options和infintius一起赋给options，页面加载时渲染到页面上
    //                    在tree这个函数中给一个空数组，
    //                    如果一级下面还要子集，就让children在执行以下这个方法，就可以把数据添加到一级下面。 
      add(){
          let pid=this.value.pop()
          let obj={//新数据的信息
              title:this.title,
              name:this.name,
              pid:pid//取出最后一项
          }
        //   console.log(obj)
        //调用 添加的接口
        this.axios.post("/addlimit",obj).then(res=>{//把数据放在obj里面，点击添加时连接后台，把数据传给后台,后台中let {title,name,pid}=req.body接受参数，通过prop接受渲染在页面上
            if(res.data.err_code==200){
                this.$router.push({name:"list"})
            }else{//如果不正确就清空
                this.name=""
                this.title=""
            }
        })
      },
      //处理无限极分类的方法
      // tree(info,pid){
      //     let data=[]
      //     for(let i in info ){
      //         if(info[i].pid==pid){
      //             var x={
      //                 value:info[i]._id,
      //                 label:info[i].title,
      //                 children:this.tree(info,info[i]._id)
      //             }
      //             //如果没有子权限就删除第一个属性
      //             if(x.children.length==0){
      //                 delete x.children
      //             }
      //             data.push(x)
      //         }
      //     }
          
      //     return data
      // }
  }
};
</script>

<style scoped>
.el-button{
    float: left;
}
</style>