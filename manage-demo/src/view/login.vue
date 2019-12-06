<template>
    <div class="login">
        <div v-if="show==false">
            <!-- 图片 -->
            <div class="img">
                <img src="/static/1.jpg" alt="">
            </div>
            <h2>渠道商管理平台</h2>
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
        <div v-else class="ok">
            <i class="el-icon-success animated shake"></i>
            <p class="animated fadeInLeft">登录成功</p>
        </div>
    </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
}
html,body,#app,.login{
    /* width: 100%; */
    height: 100%;
    background: #f0f0f2;
    overflow: hidden;
}
.img{
    width: 100px;
    height: 100px;
    margin: 100px auto 0;
}
.img>img{
    width: 100%;
    height: 100%;
}
h2{
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
    width: 150px;
    height: 170px;
    margin: 200px auto 0;
    text-align: center;
}
.el-icon-success{
    font-size: 150px;
}
.ok>p{
    padding: 35px 0;
}
</style>

<script>
export default {
    data(){
        return{
            show:false
        }
    },
    methods:{
        denglv(){
           setTimeout(()=>{
                this.$router.push({"name":"base"})
           },3000)
            this.show=true
        }
    }
}
</script>