<template>
  <div class="home">
    <el-header>
      <homeTop></homeTop>
    </el-header>
    <el-container class="el-container">
      <!-- 侧边栏 start-->
      <el-aside
        width="auto"
        :class="{ item1: isCollapsed === false, item2: isCollapsed === true }"
      >
        <tk-menu :collapse="collapsed" :options="options" :tkMenu="'tk-menu'"></tk-menu>
        <div
          class="block"
         >
           <div class="toggle" @click="toggle">
            <i
              :class="isCollapsed ?'el-icon-s-unfold':'el-icon-s-fold'"
            ></i>
          </div>
        </div>
      </el-aside>
       <!-- 侧边栏 end-->
       <!-- 主要内容 start -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 主要内容 end -->
    </el-container>
  </div>
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
  .el-header {
    padding: 0;
    height: auto !important;
  }
  .home-header {
    width: 100%;
    height: 60px;
    position: relative;
  }
  .el-container {
    height: calc(100% - 60px);
    background: #fff;
    .el-aside {
      background: $background-color;
      height: 100%;
      overflow: hidden;
      .block {
        height: 80px;
        .toggle {
          i {
            cursor: pointer;
            float: right;
            padding-right: 19px;
            color: #ffffff;
            font-size: 30px;
          }
        }
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
  }
}
.el-main {
  position: relative;
  padding: 10px !important;
  height: 100% !important;
}
.el-tabs--border-card {
  border: none;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-right-color: #fff;
  border-left-color: #fff !important;
}
</style>
