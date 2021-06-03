<template>
  <!-- 会员管理 -->
  <div class="member-search">
    <el-form :inline="true"
             size="mini"
             :model="form"
             class="form">
      <div class="left">
        <el-form-item label="登录名:"
                      class="form-item">
          <el-input v-model="form.loginName"
                    placeholder="请输入登录名"
                    @keyup.enter.native="shearch"></el-input>
        </el-form-item>
        <el-form-item label="oa账号:"
                      class="form-item">
          <el-input v-model="form.oaNo"
                    placeholder="请输入oa账号"
                    @keyup.enter.native="shearch"></el-input>
        </el-form-item>
        <el-form-item label="用户名:"
                      class="form-item">
          <el-input v-model="form.userName"
                    placeholder="请输入用户名"
                    @keyup.enter.native="shearch"></el-input>
        </el-form-item>
        <el-form-item label="手机:"
                      class="form-item">
          <el-input v-model="form.mobile"
                    placeholder="请输入手机号"
                    @keyup.enter.native="shearch"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色:"
                      class="form-item">
          <el-select v-model="form.role"
                     placeholder="请选择角色">
            <el-option value="0"
                       label="角色1">
            </el-option>
            <el-option value="1"
                       label="角色2">
            </el-option>
          </el-select>
        </el-form-item> -->
      </div>
      <div class="right">
        <el-form-item>
          <el-button class="my-btn"
                     @click="shearch">搜&nbsp;&nbsp;索</el-button>
          <el-button class="el-button"
                     @click="reset">重&nbsp;&nbsp;置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "member-list",
  data() {
    return {
      form: {
        userName: "",
        mobile: "",
        oaNo: "",
        loginName: ""
      }
    };
  },
  methods: {
    // 搜索
    shearch() {
      alert("搜索");
    },
    // 重置
    reset() {
      this.form = {
        userName: "",
        mobile: "",
        oaNo: "",
        loginName: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.member-search {
  padding: 15px 10px 0;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.form {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    .form-item {
      margin-right: 15px;
    }
  }
  .right {
    .el-button {
      @include btnColor1;
    }
    .my-btn {
      @include btnColor2;
    }
  }
}
</style>
