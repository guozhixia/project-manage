import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login=()=>import("@/view/login.vue")
const base=()=>import("@/view/base.vue")
const user=()=>import("@/components/analyze/user.vue")
const menu=()=>import("@/components/analyze/menu.vue")
Vue.use(Router)

export default new Router({
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
      redirect:"/login"
    }
  ]
})
