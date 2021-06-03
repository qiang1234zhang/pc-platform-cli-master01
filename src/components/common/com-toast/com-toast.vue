<template>
    <div class="toast" v-show="show">
        <div> {{message}}</div>
    </div>
</template>

<script>
export default {
  name: "com-toast",
  data() {
    return {
      show: false,
      message: ""
    };
  },
  mounted() {},
  methods: {
    changeShow(message = "操作成功", duration = 3000) {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, duration);
    }
  }
};
</script>
<style lang="scss" scoped>
.toast {
  width: 160px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
