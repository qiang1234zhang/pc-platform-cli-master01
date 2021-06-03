<template>
   <el-dialog
        :title = "title"
        :width="width"
        :visible.sync = "visible"
        :before-close="close"
        class='details-dialog'
    >
      <slot></slot>
      <div class="dialog-footer"  >
        <slot name = "footer"> 
           <el-button type = "primary" size="mini"  @click="close">取&nbsp;&nbsp;消</el-button>
           <el-button type = "primary" size="mini"  @click="confirmDialog">确&nbsp;&nbsp;定</el-button>
        </slot>
     </div>
  </el-dialog>
</template>

<script>
export default {
  name: "com-dialog",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    width: {
      type: String,
      default: "50%"
    },
    //数据
    obj: {
      type: Object,
      default: () => {}
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
      this.$emit("closeDialog");
    },
    confirmDialog() {
      this.$parent.confirmDialog(this.obj.id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.dialog-footer {
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
