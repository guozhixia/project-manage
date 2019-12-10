<template>
    <div class="base">
        <el-container>
            <el-header>
                <span>渠道商管理平台</span>
                <el-button @click="out">{{adminname}}退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!-- 左侧导航栏 -->
                     <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#f7f7f7" text-color="#000" active-text-color="#f55d54">
                        <!-- 导航一 -->
                        <el-submenu :index="(i+1).toString()" v-for="(v,i) in leftlist" :key="i">
                            <template slot="title">
                                <i class="el-icon-pie-chart"></i>
                                <span>{{v.title}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="`${i+1}-${i2+1}`" v-for="(v2,i2) in v.children" :key="`${i}-${i2}`" @click="$router.push({'name':v2.name})">{{v2.title}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
*{
    margin: 0;
    padding: 0;
}
.base{
    height: 100%;
    background: #f0f0f2;
    overflow: hidden;
}
.el-header{
    background: #f8f8f8;
}
.el-header>span{
    font-size: 25px;
    line-height: 60px;
    color: #f55d54;
}
.el-button{
    float: right;
    margin: 10px;
}
.el-icon-close{
    font-size: 10px;
}
.el-container{
    width: 100%;
    height: 100%;
}
.el-aside{
    height: 100%;
    background: #f7f7f7;
    margin: 10px 0 0 10px;
}
.el-main{
    background: #e0e0e0;
    margin: 10px 10px 0 10px;
}
</style>

<script>
export default {
    data(){
        return{
            left:[],
            adminname:""
        }
    },
    methods: {
        menumethods(){
            this.$router.push({"name":"menu"})
        },
        out(){
            //清除本地缓存
            localStorage.removeItem("apitoken")
            //跳转到登录页面
            this.$router.push({name:"login"})
        },
        treelist(info,pid){
            let data=[]
            for(let i in info ){
                if(info[i].pid==pid){
                    var x={
                        ...info[i],
                        children:this.treelist(info,info[i]._id)
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
    },
      mounted(){
        //请求所有权限，渲染到页面
        // this.axios.get("/getlimit").then(res=>{
        //     // console.log(res.data)
        //     this.left=res.data.info
        // })
        //根据管理员的id查找对应的全下渲染到左侧导航
        this.axios.get("/getadmin",{
            params:{
                id:JSON.parse(localStorage.getItem("apitoken")).id
            }
        }).then(res=>{
            this.left=res.data.limitarr
            this.adminname=res.data.name
        })
    },
    computed:{
        leftlist(){
            return this.treelist(this.left,0)
        }
    }
}
</script>