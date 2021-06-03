<template>
    <div class="loader" v-show="isShow">
       <div class="loading">
          <p>
           <i></i>
           <i></i>
           <i></i>
           <i></i>
           <i></i>
           <i></i>
           <i></i>
           <i></i>
          </p>
       </div>
    </div>
</template>

<script>
export default {
  name: "com-loading",
  props: {},
  data() {
    return {
      isShow: false
    };
  },
  mounted() {},
  methods: {
    showLoading() {
      this.isShow = true;
      console.log(this.isShow, "this.isShow");
    },
    hideLoading() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.loader {
  width: 140px;
  height: 140px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    p {
      position: relative;
      margin-left: -10%;
      margin-top: -10%;
    }
    i {
      display: block;
      width: 15px;
      height: 15px;
      background: $background-color;
      border-radius: 50%;
      position: absolute;
      &:nth-child(1) {
        left: 25px;
        top: 0px;
        animation: loading 1s ease -0s infinite;
      }
      &:nth-child(2) {
        left: 17px;
        top: 17px;
        animation: loading 1s ease -0.12s infinite;
      }
      &:nth-child(3) {
        left: 0px;
        top: 25px;
        animation: loading 1s ease -0.24s infinite;
      }
      &:nth-child(4) {
        left: -17px;
        top: 17px;
        animation: loading 1s ease -0.36s infinite;
      }
      &:nth-child(5) {
        left: -25px;
        top: 0px;
        animation: loading 1s ease -0.48s infinite;
      }
      &:nth-child(6) {
        left: -17px;
        top: -17px;
        animation: loading 1s ease -0.6s infinite;
      }
      &:nth-child(7) {
        left: 0px;
        top: -25px;
        animation: loading 1s ease -0.72s infinite;
      }
      &:nth-child(8) {
        left: 17px;
        top: -17px;
        animation: loading 1s ease -0.84s infinite;
      }
    }
  }
}
@keyframes loading {
  50% {
    transform: scale(0.4);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
