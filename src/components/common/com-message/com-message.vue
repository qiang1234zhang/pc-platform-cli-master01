<template>
    <div  v-show="isShowMsg">
    </div>
</template>

<script>
export default {
  name: "com-message",
  props: {},
  data() {
    return {
      isShowMsg: true
    };
  },
  mounted() {},
  methods: {
    showSuccessMessage(str, delay) {
      if (this.isShowMsg) {
        this.$message({
          message: str,
          type: "success"
        });
      }
      this.isShowMsg = false;
      setTimeout(() => {
        this.isShowMsg = true;
      }, delay);
    },
    showErrorMessage(str, delay) {
      if (this.isShowMsg) {
        this.$message({
          message: str,
          type: "error"
        });
      }
      this.isShowMsg = false;
      setTimeout(() => {
        this.isShowMsg = true;
      }, delay);
    }
  }
};
</script>
