// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import home from  './components/home.vue';
import comments from  './components/comments.vue';
import highLists from "./components/highLists.vue";
import homePage from "./components/homePage.vue";
// 引入vue-router
import vueRouter from "vue-router"
Vue.use(vueRouter)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 引入axios
import Axios from 'axios'
// 把axios加入到Vue原型上
Vue.prototype.$axios = Axios
Vue.use(VueAwesomeSwiper)
// 引入vuex
import store from './vuex/store.js';
Vue.config.productionTip = false

/*axios不携带cookie,所以需要进行配置让axios请求携带认证信息*/ 
Axios.defaults.withCredentials = true;


let router = new vueRouter({
  routes: [
    {
      path:"/",redirect:"/home"
    },
    {
      path:"/home",name:'home',component:home
    },
    {
      path:"/comments",name:'comments',component:comments
    },  
    {
      path:"/highLists",name:'highLists',component:highLists
    },{
      path:"/homePage",name:"homePage",component:homePage
    }
  ]
})
// 路由守卫   解决点击榜单歌曲直接跳转评论界面的问题
router.beforeEach((to, from, next) => {
  if(to.path=="/comments"){
    var isRes = confirm("您将前往评论界面，享受听歌+评论的双重感受，是否前往？");
    if(isRes){
      next()
    }else{
      return;
    }
  }else{
    next();
  }
  // if((to.path=="/home")||(to.path=="/homePage")){

  // }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
