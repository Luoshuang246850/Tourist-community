import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//饿了么的UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import leftMenu from './layout/left-menu';
import topHeader from './layout/top-header';


Vue.config.productionTip = false

Vue.component('leftMenu',leftMenu)
Vue.component('topHeader',topHeader)
Vue.use(ElementUI);
// import {checkToken} from './api/api';
// router.beforeEach((to,from,next) => {
//   // console.log(to);
//   // console.log(from);
//   // console.log(next);
//   // next();
//   //如果是登录界面，则需要放行
//   if (to.path === '/login') {
//     //如果要做得更好一点，如果用户要跳转到登录页面
//     //当前已经登录了，则没必要再到登录界面了，除非用户点击退出登录
//     //如果已经登录，根据角色判断页面跳转。
//     next();
//   } else {
//     //否则检查用户角色
//     checkToken().then(result => {
//       let res = result.data;
//       console.log(res);
//       if (res.code === 20000){
//         //成功，判断用户角色
//         //管理员放行
//         //普通用户，跳转到门户首页
//         if (res.data.roles === 'role_admin'){
//           next();
//         }else {
//           location.href = 'https://www.sunofbeach.net';
//         }
//       }else {
//         //跳转到登陆页面
//         next({
//           path:'/login'
//         })
//       }
//     })
//   }
//
// })
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
