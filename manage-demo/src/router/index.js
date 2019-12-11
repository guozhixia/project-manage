import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login=()=>import("@/view/login.vue")
const base=()=>import("@/view/base.vue")
const user=()=>import("@/components/analyze/user.vue")
const menu=()=>import("@/components/analyze/menu.vue")
const limitlist=()=>import("@/components/limits/limitlist.vue")
const add=()=>import("@/components/limits/add.vue")
const rolelist=()=>import("@/components/role/rolelist.vue")
const addrole=()=>import("@/components/role/addrole.vue")
const editrole=()=>import("@/components/role/editrole.vue")
const adminlist=()=>import("@/components/admin/adminlist.vue")
const addadmin=()=>import("@/components/admin/addadmin.vue")
const editadmin=()=>import("@/components/admin/editadmin.vue")
const goodslist=()=>import("@/components/goods/goodslist.vue")
const addgoods=()=>import("@/components/goods/addgoods.vue")
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
          path: 'User',
          name: 'user',
          component: user
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu
        },
        {
          path: 'limitlist',
          name: 'limitlist',
          component: limitlist
        },
        {
          path: 'add',
          name: 'add',
          component: add
        },
        {
          path: 'rolelist',
          name: 'rolelist',
          component: rolelist
        },
        {
          path: 'addrole',
          name: 'addrole',
          component: addrole
        },
        {
          path: 'editrole/:id',
          name: 'editrole',
          component: editrole
        },
        {
          path: 'adminlist',
          name: 'adminlist',
          component: adminlist
        },
        {
          path: 'addadmin',
          name: 'addadmin',
          component: addadmin
        },
        {
          path: 'editadmin/:id',
          name: 'editadmin',
          component: editadmin
        },
        {
          path: 'goodslist',
          name: 'goodslist',
          component: goodslist
        },
        {
          path: 'addgoods',
          name: 'addgoods',
          component: addgoods
        }
      ]
    },
    {
      path:"/",
      redirect:"/base/User"
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
  let id=localStorage.getItem("apitoken")?JSON.parse(localStorage.getItem("apitoken")).id:""
  //如果是登录页面--不用验证，排除了
  if(to.name!="login"){
    axios.get("/checktoken",{
      headers:{token:token}
    }).then(res=>{
      // console.log(res.data)
      //如果失败--跳转到登录页面
      if(res.data.err_code==200){
        //有权限进入
        axios.get("/checklimit",{
          params:{
            id:id,
            name:to.name
          }
        }).then(val=>{
          if(val.data.err_code==200){
            next()
          }else{
            alert("没有权限")
          }
        })
        
        //没有权限 弹框--没有权限请联系工作人员
      }else{
        router.push({name:"login"})
        next()
      }
    })
  }else{
    next()
  }

})
export default router
