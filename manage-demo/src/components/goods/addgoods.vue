<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="title"></el-input>
            </el-form-item>
        <el-form-item label="分类图片">
            <!-- action图片上传接口地址，换成自己服务器的，on-preview点击文件列表中已上传的文件时，执行的函数，on-remove点击文件列表时删除按钮时执行的函数，on-success文件上传成功时执行的函数 -->
            <el-upload
                class="upload-demo"
                action="http://127.0.0.1:3000/fileup"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                list-type="picture"
                name="picture"
                >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
    </el-form-item>
    <el-form-item label="所属分类">
       <el-cascader
          :options="options"
          v-model="pid"
          :props="{ checkStrictly: true }"
          :show-all-levels="false"
        ></el-cascader>
    </el-form-item>
    <el-form-item>
        <el-button @click="add">添加</el-button>
        <el-button @click="$router.push({name:'goodslist'})">返回</el-button>
    </el-form-item>
</el-form>
</div>
</template>

<script>
import treelist from "@/Myjs/tree.js"
export default {
    data() {
      return {
        pid:["0"],
        imgurl:"",
        options:[
            {
                value:"0",
                label:"一级分类"
            }
        ],
        title:"",//分类名称
        fileList: []
      };
    },
    mounted(){
        this.axios.get("/sortgoods").then(res=>{
            console.log(res)
            let data=treelist(res.data.info,0)
            // console.log(data)
            this.options=[...this.options,...data]
            console.log(this.options)
            // this.options=treelist(res.data.info,0)
        })
    },
    methods: {
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleSuccess(respone,file, fileList){
            // console.log(respone,file, fileList)
            this.imgurl=respone.imgurl
        },
         add(){
             let pid=this.pid
            // console.log(this.imgurl,this.pid,this.title)
            //将这三个值放在monogodb中保存起来
            this.axios.post("/addgoods",{
                title:this.title,
                imgurl:this.imgurl,
                pid:pid.pop()
            }).then(res=>{
                if(res.data.err_code==200){
                    console.log("成功")
                }else{
                    console.log("失败")
                }
            })
            this.$router.push({name:"goodslist"})
        },
    }
  }
</script>

<style scoped>
.el-button{
    float: left;
}
</style>