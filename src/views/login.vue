<template>
  <div class="login-background">
    <div class="picture-center">
      <img src="../assets/image/login.png">
      <h5>管理系统</h5>
      <div class="login-box">
        <el-form ref="form"
                 :model="user"
                 label-position="left"
                 label-width="80px">
          <el-form-item label="用户名:">
            <el-input v-model="user.name"
                      size="mini"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="user.password"
                      size="mini"
                      show-password
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       @click="login">登录</el-button>
            <el-button @click="resetFn"
                       size="mini">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="btn">
          <div class="save-name"
               @click="isSave = !isSave">
            <i :class="{save:isSave,nosave:!isSave}"></i>
            <span>记住用户名</span>
          </div>
        </div>
        <div class="login-msg"
             v-if="error">*账号或密码有误</div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home");

import API from "@/api/api-url";

export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      isSave: false,
      error: false
    };
  },
  methods: {
    ...mapActions(["CHANGE_ROUTER"]),
    async login() {
      this.saveName();
      let msg = {
        username: this.user.name,
        password: this.user.password
      };
      // let res = await http({
      let res = await this.$axios({
        url: API.login,
        method: "post",
        data: msg
        // headers: {
        //   "Bearer Authorization": ""
        // }
      });
      if (res.responseCode === "010200") {
        localStorage.setItem(
          "Authorization",
          JSON.stringify("Bearer " + res.responseData.token)
        );
        localStorage.setItem(
          "userName",
          JSON.stringify(res.responseData.username)
        );
        // let menus = res.responseData.menus;
        // this.CHANGE_ROUTER(menus);
        this.$router.push({
          name: "welcome"
        });
      } else {
        this.error = true;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetFn() {
      this.user = {
        name: "",
        password: ""
      };
    },
    // 记住用户名
    saveName() {
      if (this.isSave) {
        let username = this.user.name;
        let userstatus = this.isSave;
        window.localStorage.setItem(
          "user",
          JSON.stringify({ username, userstatus })
        );
      }
    }
  },
  created() {
    let userinfo = JSON.parse(window.localStorage.getItem("user")) || "";
    if (userinfo.length !== 0) {
      this.isSave = userinfo.userstatus;
      if (this.isSave) {
        this.user.name = userinfo.username;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-background {
  min-width: 1200px;
  min-height: 590px;
  width: 100%;
  height: 100%;
  background: url(../assets/image/login.jpg) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .picture-center {
    width: 78.6%;
    height: 72%;
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.2rem;
    > img {
      position: absolute;
      top: 0.61rem;
      left: 0.54rem;
      width: 4.13rem;
      height: 3.23rem;
    }
    > h5 {
      position: absolute;
      top: 0.63rem;
      right: 0.7rem;
      font-size: 0.34rem;
      color: #505354;
    }
    .login-box {
      position: absolute;
      top: 2.56rem;
      right: 1.25rem;
      .form-input {
        width: 3.6rem;
        border-bottom: 1px solid #dcdfe6;
        margin-bottom: 0.3rem;
        padding-bottom: 0.1rem;
        span {
          font-size: 0.14rem;
          display: inline-block;
          width: 0.56rem;
          border-right: 1px solid #505354;
        }

        input {
          margin-left: 0.14rem;
          background-color: transparent;
          border: none;
        }
      }

      .btn {
        button {
          width: 1rem;
          height: 0.4rem;
          border-radius: 0.02rem;
          border: none;
          cursor: pointer;
        }
        button:nth-child(1) {
          background-color: #2bb5f1;
          color: #fff;
          margin-right: 0.25rem;
        }
        button:nth-child(2) {
          background-color: #fff;
          color: #2bb5f1;
          border: 1px solid #2bb5f1;
        }
      }
      .save-name {
        display: flex;
        height: 0.4rem;
        align-items: center;
        i {
          display: inline-block;
          margin-right: 0.05rem;
        }
        .save {
          width: 0.2rem;
          height: 0.15rem;
          background: url(../assets/image/selected.png) no-repeat center center;
          background-size: contain;
        }
        .nosave {
          width: 0.2rem;
          height: 0.15rem;
          background: url(../assets/image/unselected.png) no-repeat center
            center;
          background-size: contain;
        }
        span {
          font-size: 1.66vh;
          color: rgba(51, 57, 57, 1);
          font-weight: 400;
          font-family: PingFang SC;
        }
      }
      .login-msg {
        width: 72.89%;
        margin: 0 auto;
        font-size: 1.29vh;
        font-weight: 400;
        color: rgba(245, 113, 112, 1);
      }
    }
  }
}
</style>
