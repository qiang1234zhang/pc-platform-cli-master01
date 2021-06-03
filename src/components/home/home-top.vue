<template>
  <div class="home-top">
    <div class="home-logo"></div>
    <div class="home-name">管理系统</div>
    <div class="home-right">
      <el-dropdown @command="clickMenu">
        <div class="home-info">
          <span>欢迎您</span>
          <img src="../../assets/image/image-photo.jpg"
               alt="">
          <span>{{userName}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  methods: {
    clickMenu(val) {
      // console.log(val);
      if (val === "lgout") {
        window.localStorage.removeItem("Authorization");
        this.$router.push("/login");
      }
    },
    getuserName() {
      this.userName = JSON.parse(localStorage.getItem("userName"));
    }
  },
  created() {
    this.getuserName();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.home-top {
  height: 60px;
  background-color: $background-color;
  position: relative;
  .home-logo {
    position: absolute;
    left: 0.47rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2.03rem;
    height: 0.48rem;
    background: url(../../assets/image/tk-logo.png) no-repeat center center;
    background-size: contain;
  }
  .home-name {
    position: absolute;
    left: 2.7rem;
    top: 50%;
    transform: translateY(-50%);
    border-left: solid 1px #fff;
    padding-left: 0.2rem;
    color: #fff;
    font-size: 16px;
  }
  .home-right {
    height: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    right: 0.4rem;
    .home-info {
      display: flex;
      align-items: center;
      color: #fff;
      img {
        height: 0.4rem;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 0.1rem;
      }
      span {
        word-break: keep-all;
        white-space: nowrap;
        margin-right: 5px;
      }
    }
  }
}
</style>
