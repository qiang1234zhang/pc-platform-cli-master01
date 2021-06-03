<template>
  <el-container  class="home">
    <!-- 侧边栏 start-->
    <el-aside
      width="200px"
      :class="{ item1: isCollapsed === false, item2: isCollapsed === true }"
    >
     <!-- 顶部 -->
      <div
        class="block"
       >
         <div class="toggle">
         <span class="menu-nav"
              v-if="collapsed === false">网站导航</span>
          <i
            :class="isCollapsed ?'el-icon-s-unfold':'el-icon-s-fold'"
            @click="toggle"
          ></i>
        </div>
      </div>
      <tk-menu :collapse="collapsed" :options="options" :tkMenu="'tk-menu'"></tk-menu>
    </el-aside>
    <!-- 侧边栏 end-->
    <el-container class="container">
      <el-header>
        <homeTop></homeTop>
      </el-header>
       <!-- 主要内容 start -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 主要内容 end -->
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import homeTop from "@/components/home/home-top.vue";
import routeMenu from "@/components/common/route-menu/route-menu.vue";
import tkMenu from "@/components/tk-menu/tk-menu.vue";

export default {
  components: {
    homeTop,
    tkMenu,
    routeMenu
  },
  data() {
    return {
      options: {
        // menu组件需要传的值
        uniqueOpened: false,
        userName: ""
      }
    };
  },
  created() {},
  computed: {
    ...mapState("home", ["isCollapsed"]),
    collapsed() {
      return this.isCollapsed;
    }
  },
  methods: {
    ...mapMutations("home", ["SETTOGGLE"]),
    // 侧边栏展开或收起
    toggle() {
      this.SETTOGGLE("toggle");
    }
  },
  watch: {
    $route(newVal) {
      if (newVal.path === "/") {
        this.$router.replace({ name: "welcome" });
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/global.scss";
.home {
  width: 100%;
  height: 100%;
  background: rgba(242, 246, 248, 1);
  overflow: hidden;
  .el-aside {
    background: $background-color;
    height: 100%;
    overflow: hidden;
    .el-menu-item {
      font-size: 30px;
    }
  }
  .item1 {
    width: 160px !important;
    transition: all 0.3s linear;
  }
  .item2 {
    width: 65px !important;
    transition: all 0.3s linear;
  }
  .el-header {
    padding: 0;
    height: auto !important;
  }
  .home-header {
    width: 100%;
    height: 60px;
    position: relative;
  }
  .block {
    height: 60px;
    line-height: 60px;
    .toggle {
      padding: 0 10px 0 20px;
      span {
        color: #ffffff;
        font-size: 16px;
        margin-right: 40px;
      }
      i {
        cursor: pointer;
        color: #ffffff;
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
}
</style>
