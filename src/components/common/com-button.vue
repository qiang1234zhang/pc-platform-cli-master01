<template>
    <el-button 
      :class="style"
      :size="size"  
      @click="handleClick"
      :disabled="disabled"
      :icon="icon">
      {{text}}
    </el-button>
</template>

<script>
export default {
  name: "com-dialog",
  props: {
    className: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "mini"
    },
    text: {
      type: String,
      default: "确认"
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      style: ""
    };
  },
  mounted() {
    if (this.disabled) {
      this.style = "disabled";
    } else {
      if (this.className === "btn1") {
        this.style = "btn1";
      } else if (this.className === "btn2") {
        this.style = "btn2";
      } else {
        this.style = "";
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.btn1 {
  @include btnColor1;
}
.btn2 {
  @include btnColor2;
}
.disabled {
  color: #c0c4cc;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
</style>
