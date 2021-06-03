<template>
  <div :class="tkMenu" class="route-menu">
    <el-menu
      :default-active="dealPath($route.path)"
      :unique-opened="options.uniqueOpened"
      :default-openeds="defaultOpeneds"
      router
      background-color="#227b9d"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <!-- 一级菜单 v-if和v-for尽量不写在一个标签上-->
      <template
        v-for="(item, index) in $router.options.routes"
      >
        <template v-if="!item.hidden&&checkMenu(item.menuCode)">
          <el-submenu
            v-if="!item.leaf"
            :index="index + ''"
            :key="index + ''"
            :show-timeout="showTimeout"
            :hide-timeout="hideTimeout"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span>{{ item.meta.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="itemChild in item.children">
              <!-- 二级菜单下有三级 -->
              <el-submenu
                v-if="itemChild.children && itemChild.children.length"
                :index="itemChild.path"
                class="three-menu"
                :key="itemChild.path"
                :show-timeout="showTimeout"
                :hide-timeout="hideTimeout"
              >
                <template slot="title">
                  <i :class="itemChild.iconCls"></i>
                  <span class="name-title">{{ itemChild.meta.name }}</span>
                </template>
                <!-- 三级菜单 -->
                <el-menu-item
                  v-for="itemChild_Child in itemChild.children"
                  :index="itemChild_Child.path"
                  @click="toNewPage(itemChild_Child.path)"
                  :key="itemChild_Child.path"
                >
                  <i :class="itemChild_Child.iconCls"></i>
                  <span slot="title" class="name-title-three">
                    {{
                    itemChild_Child.meta.name
                    }}
                  </span>
                </el-menu-item>
              </el-submenu>
              <!-- 二级下没有三级 -->

              <el-menu-item
                v-else-if="checkMenu(itemChild.menuCode)"
                :index="itemChild.path"
                @click="toNewPage(itemChild.path)"
                :key="itemChild.path"
              >
                <i :class="itemChild.iconCls"></i>

                <span class="name-title" slot="title">{{ itemChild.meta.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <!-- 判断一级菜单是否有子节点(没有子节点) -->
          <el-menu-item v-else :index="item.path" :key="item.path + ''" @click="toNewPage(item.path)">
            <i :class="item.iconCls"></i>
            <span>{{ item.meta.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showTimeout: 0,
      hideTimeout: 0
    };
  },
  created() {},
  props: {
    // 整个查询条件最外层的类名
    tkMenu: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  computed: {
    ...mapState("home", ["elementCode", "defaultOpeneds"])
  },
  methods: {
    //跳转到下个页面
    toNewPage(page) {
      this.$router.push({ path: page });
    },
    handleOpen(index, indexPath) {
      console.log(index, indexPath);
      this.$emit("handleOpen", index, indexPath);
    },
    handleClose(index, indexPath) {
      this.$emit("handleClose", index, indexPath);
    },
    handleSelect(index, indexPath) {
      this.$emit("handleSelect", index, indexPath);
    },
    //配置 el-menu 修改默认选中（需修改）
    dealPath(inPath) {
      if (inPath.indexOf("/product-query") != -1) {
        return "/product-query*";
      }
      return inPath;
    },
    //判断是否有权限（需修改）
    checkMenu(code) {
      if (this.elementCode[code]) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.$router.options;
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.route-menu {
  background: $background-color;
  height: calc(100% - 40px);
  overflow: hidden;
  .el-menu {
    border: none;
    overflow: hidden;
  }
  .el-menu-item {
    font-size: 14px;
    padding: 0;
    i {
      color: #fff;
      margin-right: 5px;
    }
  }
  .el-menu-item.is-active i {
    color: #ffd04b;
  }
}
</style>
<style lang="scss">
.route-menu {
  .el-submenu {
    color: #fff;
    font-size: 30px;
  }
  .el-submenu__title {
    font-size: 14px;
    i {
      color: #fff;
      margin-right: 5px;
    }
    .el-submenu__icon-arrow {
      right: 6px;
    }
  }
}
.el-menu--vertical {
  .el-menu-item {
    i {
      color: #fff;
      margin-right: 5px;
    }
  }
}
</style>
