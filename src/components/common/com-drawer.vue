<template>
  <el-drawer
      :title="title"
      :size="width"
      :direction="direction"
      visible
      :before-close="close"
    >
      <slot> </slot>
    <div class="drawer-footer"  v-show = "hasFooter">
        <slot name = "footer"> 
           <el-button type = "primary" size="mini"  @click="close">取&nbsp;&nbsp;消</el-button>
           <el-button type = "primary" size="mini"  @click="confirmDrawer">确&nbsp;&nbsp;定</el-button>
        </slot>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "com-drawer",
  props: {
    title: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: "rtl"
    },
    width: {
      type: String,
      default: "50%"
    },
    //数据
    obj: {
      type: Object,
      default: () => {}
    },
    hasFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("closeDrawer");
    },
    confirmDrawer() {
      this.$parent.confirmDrawer(this.obj.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-button:first-child {
    @include btnColor1;
  }
  .el-button:nth-child(2) {
    @include btnColor2;
  }
}
</style>
<style lang="scss">
.el-drawer__body {
  padding: 5px 10px;
}
</style>
