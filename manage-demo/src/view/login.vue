<template>
    <div class="login">
        <!-- 图片 -->
        <div class="img">

        </div>
        <h1>渠道商管理平台</h1>
        <!-- 登录信息 -->
        <form action="">
            <select name="" id="">
                <option value="管理员">管理员</option>
                <option value="管理员">企业</option>
                <option value="管理员">平台</option>
            </select>
            <input type="text" placeholder="账户名">
            <input type="password" placeholder="密码">
            <button type="button" @click="denglv">登录</button>
        </form>
    </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
}
html,body,#app{
    width: 100%;
    background: #f0f0f2;
}
.img{
    width: 120px;
    height: 120px;
    background: palegreen;
    margin: 100px auto 0;
}
h1{
    font-weight: 500;
    text-align: center;
    padding: 20px 0;
}
form{
    width: 300px;
    margin:0 auto;
} 
form>select{
    width: 100%;
    height: 30px;
    border: solid 1px #ccc;
    border-radius: 5px;
    margin-bottom: 12px;
} 
form>input{
    width: 100%;
    height: 30px;
    border: solid 1px #ccc;
    border-radius: 5px;
    margin-bottom: 12px;
} 
form>button{
    width:302px;
    background: #f55d54;
    border: none;
    height: 30px;
    border-radius: 5px;
}
.ok{
    width: 50px;
    height: 50px;
}
.el-icon-success{
    font-size: 50px;
}
</style>

<script>
export default {
    methods:{
        denglv(){
            this.$router.push({"name":"base"})
        }
    }
}
</script>