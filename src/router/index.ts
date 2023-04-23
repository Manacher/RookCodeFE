import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
  path:'/login',
  name:'Login',
  component:()=>import("@/views/LoginAndRegister/Login.vue")
  },
  {
    path:'/register',
    name:'Register',
    /*下面为登录限制,是否需要登录验证，当根目录被限制时，其子模块也将被限制*/
   /* meta:{requiresAuth:true},*/
    component:()=>import("@/views/LoginAndRegister/Register.vue")
  },
  {
    path:'/solutions',
    name:'Solutions',
    /*下面为登录限制,是否需要登录验证，当根目录被限制时，其子模块也将被限制*/
    //meta:{requiresAuth:false},
    component:()=>import("@/views/Solutions.vue")
  },
  {
    path:'/qtestcases',
    name:'QTestcases',
    /*下面为登录限制,是否需要登录验证，当根目录被限制时，其子模块也将被限制*/
    //meta:{requiresAuth:false},
    component:()=>import("@/views/QTestCases.vue")
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由判断
router.beforeEach((to,from,next)=>{

  //检查父亲需求即可
  if(to.matched.some(r=>r.meta?.requiresAuth)){
    //判断是否有token
    const token = store.state.token
    if(token=="") {
      //没有token 跳到登录界面，然后再跳回去
      alert(to.fullPath)

      router.push({ path: '/login' });
      //next({name:"login",query:{redirect:to.fullPath}})
    }
  }
  next()
})


export default router
