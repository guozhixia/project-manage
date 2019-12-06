import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login=()=>import("@/view/login.vue")
const base=()=>import("@/view/base.vue")
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
      component: base
    },
    {
      path:"/",
      redirect:"/login"
    }
  ]
})
