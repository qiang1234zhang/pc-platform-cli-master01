
# tk-menu (PC)
>* tk-menu 用在哪些地方
>* 现有业务中tk-menu效果
>* 说明
>* tk-menu 组件的常用api
>* 正确使用
>* tk-menu 的代码结构

# 正文
## 1.tk-menu 用在哪些地方
>* tk-menu 主要应用：网站提供导航功能的菜单。
## 2.泰康现有业务中tk-menu 效果
> 1. 泰健康项目中使用的菜单栏
![Image text](http://ecuat.tk.cn/tk-online/cli/tkimg/img/menu01.jpg)

> 2. 理赔服务中控平台
![Image text](http://ecuat.tk.cn/tk-online/cli/tkimg/img/menu3.png)

## 3. 说明
> 1. 泰健康项目中几乎每个项目都会用到菜单栏，菜单栏的开发可以节省很多时间
> 2. 菜单栏可以直观显示出页面的层级关系
> 3. 菜单栏中的图标可以帮助增加用户的阅读感，起到帮助理解的效果


## 4. tk-menu 组件的常用api

### Menu Attribute
|  参数              |  说明                        |  类型       |  默认值   |
|---------------    |:--------------------------:   |:----------:|:--------:|
| options   |菜单的配置项(在下面有详细说明)|	object		| -- |
| tkMenu | tk-menu最外层的自定义类名 |  String  | -- | -- |
| collapse  |是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） |	boolean	|	false |
### Menu 中的options配置项的详细说明
|  参数              |  说明                        |  类型       |  默认值   |
|---------------    |:--------------------------:   |:----------:|:--------:|
| uniqueOpened  |是否只保持一个子菜单的展开|	object		| -- |
| backgroundColor   |菜单的背景色（仅支持 hex 格式）|	string		| -- |
| textColor	 |菜单的文字颜色（仅支持 hex 格式）|	string		| -- |
| activeTextcolor  |当前激活菜单的文字颜色（仅支持 hex 格式）|	string	|	-- |
| router  |是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 |	boolean	|	-- |

### Menu Events

|  方法名称         |  说明                      |  参数       
|---------------|:--------------------------:|:----------:|
|handleOpen	| sub-menu展开的回调	|(两个参数index、indexPath) index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 indexPath |
|handleClose	|sub-menu收起的回调	|(两个参数index、indexPath) index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path |
|handleSelect	|菜单激活回调	|(两个参数index、indexPath) index: 选中菜单项的 index, indexPath: 选中菜单项的 index path |

## 6. Demo
<template>
  <div>
    <el-container class="el-container-class">
      <el-header>
        <div>
          <img src="@/assets/header-bg.jpg"
               style="height: 60px;width: 100%;" />
        </div>
      </el-header>
      <el-container class="el-container-inner-class">
        <el-aside style="width: 200px; max-width: 200px;">
          <tk-menu :tkMenu="'tk-menu'"
                   :options="options"
                   :collapse="collapsed"></tk-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tkMenu from "@/block/tk-menu/tk-menu.vue";
import menuUtil from "@/block/tk-menu/menuUtil.js";
export default {
  components: {
    tkMenu
  },
  data() {
    return {
      options: {
        uniqueOpened: true
      },
      collapsed: false, // 菜单是否折叠
      AllMenuEle: [],
      result: {
        menuCode: "0",
        menuName: "中控平台",
        subFcMenuVos: [
          {
            menuCode: "/0",
            menuName: "一级",
            subFcMenuVos: [
              {
                menuCode: "/0/1",
                menuName: "二级",
                subFcMenuVos: [
                  {
                    menuCode: "/0/1/1",
                    menuName: "三级1"
                  },
                  {
                    menuCode: "/0/1/2",
                    menuName: "三级2"
                  }
                ]
              },
              {
                menuCode: "/0/2",
                menuName: "二级"
              }
            ]
          },
          {
            menuCode: "/1",
            menuName: "一级",
            subFcMenuVos: [
              {
                menuCode: "/1/1",
                menuName: "二级"
              }
            ]
          },
          {
            menuCode: "/2",
            menuName: "一级"
          }
        ],
        ret_code: "GWP00000",
        ret_msg: "调用成功"
      }
    };
  },
  methods: {
    getRouter(callBack) {
      this.AllMenuEle = this.result.subFcMenuVos; // this.result是假数据，实际项目从后台获取
      if (callBack) {
        callBack(this.routes);
      } else {
        this.$router.addRoutes(this.routes);
        this.$router.options.routes.push(...this.routes);
      }
    }
  },
  computed: {
    routes() {
      let routers = [];
      let route = [];
      menuUtil(route, this.AllMenuEle);
      let menus;
      // console.log(route);
      route.map(item => {
        menus = {
          path: "/",
          component: () => import(`@/views/test-menu.vue`),
          leaf: item.leaf,
          children: [item]
        };
        routers.push(menus);
      });
      // console.log(routers);
      return routers;
    }
  }
};
</script>
<style lang="scss">
.el-header {
  padding: 0;
}
.tk-menu {
}
</style>




