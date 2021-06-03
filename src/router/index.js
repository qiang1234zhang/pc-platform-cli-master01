import Vue from "vue";
import Router from "vue-router";
import getCp from "@/provider/get-component";
import home from "@/views/other/home";

Vue.use(Router);

const router = new Router({
  //与vue.config.js 中的baseUrl 值一致
  // base: "/tk-online/platform/overtime-settlement",
  base: "",
  routes: [
    {
      path: "/",
      redirect: "/welcome"
    },
    {
      path: "/",
      name: "home",
      component: home,
      hidden: true,
      children: [
        {
          path: "/welcome",
          name: "welcome",
          component: getCp("other/welcome"),
          hidden: true
        }
      ]
    },
    {
      path: "/",
      name: "member",
      meta: {
        name: "用户管理"
      },
      iconCls: "el-icon-user-solid",
      component: home,
      menuCode: "1",
      children: [
        {
          path: "/member",
          name: "member-list",
          meta: {
            name: "用户管理"
          },
          iconCls: "iconfont icon-guizeguanli",
          component: getCp("member/list"),
          menuCode: "1_0_1"
        },
        {
          path: "/member-create",
          name: "member-create",
          meta: {
            name: "新建用户",
            isDisabied: false
          },
          iconCls: "iconfont icon-guizeguanli",
          component: getCp("member/create"),
          menuCode: "1_0_1"
        },
        {
          path: "/member-detail/:id",
          name: "member-detail",
          meta: {
            name: "用户详情",
            isDisabied: true
          },
          component: getCp("member/detail"),
          menuCode: ""
        },
        {
          component: getCp("member/edit"),
          name: "member-edit",
          meta: {
            name: "编辑用户",
            isDisabied: false
          },
          menuCode: "",
          path: "/member-edit/:id"
        },
        {
          path: "/test",
          name: "test",
          meta: {
            name: "屏幕适配测试",
            isDisabied: false
          },
          iconCls: "iconfont icon-guizeguanli",
          component: getCp("member/test"),
          menuCode: "1_0_1"
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: getCp("login"),
      iconCls: "el-icon-menu",
      hidden: true
    },
    {
      path: "/404",
      name: "404",
      component: getCp("404"),
      hidden: true
    },
    {
      path: "*", // 添加404页面,此处需特别注意放在最底部
      hidden: true,
      redirect: "/404"
    }
  ]
});
// 路由的前置守卫
// router.beforeEach((to, from, next) => {
//   store.commit("changeState", {
//     key: "elementCode",
//     val: JSON.parse(localStorage.getItem("p-menurole"))
//   });
//   let user =
//     localStorage.getItem("p-token") && localStorage.getItem("p-usertoken");
//   if (to.path === "/") {
//     localStorage.removeItem("p-token");
//     localStorage.removeItem("p-usertoken");
//     next();
//   } else if (!user) {
//     next({
//       path: "/"
//     });
//   } else if (
//     to.path !== "/home" &&
//     to.path !== "/layout" &&
//     to.path !== "/message"
//   ) {
//     let code = store.state.pathCode[to.path];
//     if (store.state.elementCode[code]) {
//       next();
//     } else {
//       next({
//         path: "/"
//       });
//     }
//   } else {
//     next();
//   }
// });
export default router;
