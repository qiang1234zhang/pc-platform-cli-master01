<template>
  <div class="route-menu">
    <!-- 顶部 -->
    <div class="toggle"
         :class="isCollapsed?'close':''"
         @click="toggle">
      <span class="menu-nav"
            v-if="isCollapsed === false">网站导航</span>
      <i :class="isCollapsed?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </div>

    <el-menu class="el-menu-vertical"
             :unique-opened="false"
             :router="false"
             :collapse="isCollapsed"
             @open="handleOpen"
             @close="handleClose"
             @select="handleSelect">
      <!-- 一级菜单 -->
      <template v-for="(item, index) in routerList">
        <el-submenu v-if="!item.leaf"
                    :index="index + ''"
                    :key="index + ''"
                    :show-timeout="showTimeout"
                    :hide-timeout="hideTimeout">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <!-- 二级菜单下有三级 -->
            <el-submenu v-if="itemChild.children && itemChild.children.length"
                        :index="itemChild.path"
                        class="three-menu"
                        :key="itemChild.path"
                        :show-timeout="showTimeout"
                        :hide-timeout="hideTimeout">
              <template slot="title">
                <i :class="itemChild.iconCls"></i>
                <span class="name-title">{{ itemChild.meta.name }}</span>
              </template>
              <!-- 三级菜单 -->
              <el-menu-item v-for="itemChild_Child in itemChild.children"
                            :index="itemChild_Child.path"
                            @click="toNewPage(itemChild_Child.path)"
                            :key="itemChild_Child.path">
                <i :class="itemChild_Child.iconCls"></i>
                <span slot="title"
                      class="name-title-three">
                  {{ itemChild_Child.meta.name }}
                </span>
              </el-menu-item>
            </el-submenu>
            <!-- 二级下没有三级 -->

            <el-menu-item v-else-if="itemChild.menuCode && checkMenu(itemChild.menuCode)"
                          :index="itemChild.path"
                          @click="toNewPage(itemChild.path)"
                          :key="itemChild.path">
              <i :class="itemChild.iconCls"></i>

              <span class="name-title"
                    slot="title">{{ itemChild.meta.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 判断一级菜单是否有子节点(没有子节点) -->
        <el-menu-item v-else
                      :index="item.path"
                      :key="item.path + ''"
                      @click="toNewPage(item.path)">
          <i :class="item.iconCls"></i>
          <span>{{ item.meta.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");

export default {
  data() {
    return {
      showTimeout: 0,
      hideTimeout: 0
      // routerList: []
    };
  },
  created() {},
  methods: {
    ...mapActions(["TOGGLE"]),
    // 侧边栏展开或收起
    toggle() {
      // this.$store.commit("toggle");
      this.TOGGLE();
    },
    //判断是否有权限
    checkMenu(code) {
      let flag = false;
      let list = this.routerInit;
      if (!list || list.length == 0) {
        return flag;
      }
      for (let i = 0; i < list.length; i++) {
        let resourceId = list[i].resourceId;
        if (resourceId == code) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    //跳转到下个页面
    toNewPage(page) {
      this.$router.push({ path: page });
    },
    handleOpen(index, indexPath) {
      this.$emit("handleOpen", index, indexPath);
    },
    handleClose(index, indexPath) {
      this.$emit("handleClose", index, indexPath);
    },
    handleSelect(index, indexPath) {
      this.$emit("handleSelect", index, indexPath);
    }
  },
  computed: {
    ...mapState({
      isCollapsed(state) {
        return state.isCollapsed;
      },
      // 请求来的原始数据
      routerInit(state) {
        return state.routerList;
      }
      // // 展示数据
      // routerList(state) {
      //   let routerVue = this.$router.options.routes;
      //   let routerList = [];
      //   for (let i = 0; i < routerVue.length; i++) {
      //     let item = routerVue[i];
      //     if (item.menuCode) {
      //       let menuCode = item.menuCode;
      //       if (this.checkMenu(menuCode, state.routerList)) {
      //         routerList.push(item);
      //       }
      //     }
      //   }
      //   return routerList;
      // }
    }),
    // 展示数据
    routerList() {
      let routerVue = this.$router.options.routes;
      let routerList = [];
      for (let i = 0; i < routerVue.length; i++) {
        let item = routerVue[i];
        if (item.menuCode) {
          let menuCode = item.menuCode;
          if (this.checkMenu(menuCode)) {
            routerList.push(item);
          }
        }
      }
      return routerList;
    }
  }
};
</script>
<style lang="scss" scoped>
.route-menu {
  padding: 5px 0;
}
.toggle {
  // width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  color: #666a75;
  span,
  i {
    line-height: 80px;
    font-size: 30px;
    box-sizing: border-box;
  }
}
.toggle.close {
  width: 64px;
  justify-content: center !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
</style>
