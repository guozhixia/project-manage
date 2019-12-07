<template>
    <div class="base">
        <el-container>
            <el-header>
                <span>渠道商管理平台</span>
                <el-button @click="out">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!-- 左侧导航栏 -->
                     <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#f7f7f7" text-color="#000" active-text-color="#f55d54">
                        <!-- 导航一 -->
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-pie-chart"></i>
                                <span>统计</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" @click="usermethods">用户分析</el-menu-item>
                                <el-menu-item index="1-2"  @click="menumethods">订单分析</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!-- 导航二 -->
                         <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-folder-opened"></i>
                                <span>管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">用户管理</el-menu-item>
                                <el-menu-item index="2-2">卡券管理</el-menu-item>
                                <el-menu-item index="2-3">商品管理</el-menu-item>
                                <el-menu-item index="2-4">订单管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!-- 导航三 -->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-unlock"></i>
                                <span>权限</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">基本配置</el-menu-item>
                                <el-menu-item index="1-2">接入权限</el-menu-item>
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
    methods: {
        usermethods(){
            this.$router.push({"name":"user"})
        },
        menumethods(){
            this.$router.push({"name":"menu"})
        },
        out(){
            //清除本地缓存
            localStorage.removeItem("apitoken")
            //跳转到登录页面
            this.$router.push({name:"login"})
        }
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath);
        // }
    }
}
</script>