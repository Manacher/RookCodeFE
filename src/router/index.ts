import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [


  {
  path:'/login',
  name:'Login',
  component:()=>import("@/views/Login.vue")
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import("@/views/Register.vue")
  }
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




    //没有token 跳到登录界面，然后再跳回去
    next({name:"login",query:{redirect:to.fullPath}})
  }

  next()

})


export default router
