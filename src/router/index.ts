import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { notification } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
// TODO 奇怪的懒加载bug，此处使用懒加载会导致页面无法正常渲染，暂时使用同步加载
// import Problem from "@/views/Problem.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    /*下面为登录限制,是否需要登录验证，需要拦截的路由将其改为true,当根目录被限制时，其子模块也将被限制*/
    meta: { requiresAuth: false },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    /*下面为登录限制,是否需要登录验证，当根目录被限制时，其子模块也将被限制*/
    meta: { requiresAuth: false },
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    name: "FrontPage",
    meta: { requiresAuth: true },
    component: () => import("../views/FrontPage.vue"),
  },
  {
    path: "/discussion",
    name: "DiscussionPage",
    meta: { requiresAuth: true },
    component: () => import("../views/DiscussionListPage.vue"),
  },
  {
    path: "/user/:id?",
    name: "UserPage",
    meta: { requiresAuth: true },
    component: () => import("../views/UserPage.vue"),
  },
  {
    path: "/problems/:pro_id",
    name: "problems",
    // component: Problem,
    component: () => import("../views/Problem.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "solution/:sln_id",
        name: "solution",
        component: () =>
          import("../components/Problem/RightComponent/Solution.vue"),
      },
      {
        path: "create-solution",
        name: "create-solution",
        component: () =>
          import("../components/Problem/RightComponent/CreateSolution.vue"),
      },
      {
        path: "edit-solution/:sln_id",
        name: "edit-solution",
        component: () =>
          import("../components/Problem/RightComponent/EditSolution.vue"),
      },
    ],
  },
  {
    path: "/submissions/detail/:sub_id",
    name: "submissions",
    meta: { requiresAuth: true },
    component: () => import("../views/Submission.vue"),
  },
  {
    path: "/discussion/detail/:dis_id",
    name: "discussion",
    meta: { requiresAuth: true },
    component: () => import("../views/Discussion.vue"),
  },
  {
    path: "/create-discussion",
    name: "create-discussion",
    meta: { requiresAuth: true },
    component: () => import("../views/CreateDiscussion.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由判断
router.beforeEach((to, from, next) => {
  //登录后登录界面不再进行打开
  if (to.path === "/login") {
    if (store.state.token != "") {
      // 用户已经登录，重定向到原来的页面
      const redirect: any = from.query.redirect;
      console.log("-------------------------------");
      console.log(redirect);
      notification.open({
        message: "已经登录",
        description: "回到原界面！",
        icon: () => h(SmileOutlined, { style: "color: #108ee9" }),
      });
      router.push({ path: redirect || "/" });
    } else {
      next();
    }
  } else {
    //判断是否有token
    if (to.matched.some((r) => r.meta?.requiresAuth)) {
      //判断是否有token
      const token = store.state.token;
      if (token == "") {
        router.push({ path: "/login" });
        //next({name:"login",query:{redirect:to.fullPath}})
      }
    }
  }
  next();
});

export default router;
