import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login=()=>import("@/view/login.vue")
const base=()=>import("@/view/base.vue")
const user=()=>import("@/components/analyze/user.vue")
const menu=()=>import("@/components/analyze/menu.vue")
import axios from "axios"
Vue.use(Router)

let router=new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      children:[
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu
        }
      ]
    },
    {
      path:"/",
      redirect:"/base/user"
    }
  ]
})
//做路由拦截的目的是----所有人只能进入登录页面，其他页面无法进入，要通过验证才能进入其他页面
//做全局的路由拦截---当路由发生改变时就验证路由是否过期
//验证成功---就进入
//验证失败---登录页面
router.beforeEach((to,from,next)=>{
  //获取token
  let token=localStorage.getItem("apitoken")?JSON.parse(localStorage.getItem("apitoken")).token:""
  //如果是登录页面--不用验证，排除了
  if(to.name!="login"){
    axios.get("/checktoken",{
      headers:{token:token}
    }).then(res=>{
      console.log(res.data)
      //如果失败--跳转到登录页面
      if(res.data.err_code==200){
        next()
      }else{
        router.push({name:"/login"})
        next()
      }
    })
  }else{
    next()
  }

})
export default router
