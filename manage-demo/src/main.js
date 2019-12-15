// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css';
//载入axios vueaxios 
import axios from "axios"
import VueAxios from "vue-axios"
import QuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'

import 'quill/dist/quill.bubble.css'

import 'quill/dist/quill.snow.css'

Vue.use(QuillEditor)
Vue.use(ElementUI);
Vue.use(animated);
Vue.use(VueAxios,axios);

import store from "./store/index.js"

//设置全局的接口地址
axios.defaults.baseURL="http://127.0.0.1:3000"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
