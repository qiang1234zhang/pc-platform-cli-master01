<template>
  <div class="step1">
    <el-row>
      <el-col :span="12">
        <el-form :model="form"
                 :disabled="isDisabied"
                 ref="form"
                 label-width="170px"
                 size="mini">
          <el-form-item label="登录名:"
                        prop="loginName">
            <el-input v-model="form.loginName"
                      maxlength="20"
                      show-word-limit
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="oa账号："
                        prop="oaNo">
            <el-input v-model="form.oaNo"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="用户名："
                        prop="userName">
            <el-input v-model="form.userName"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="手机号："
                        prop="mobile">
            <el-input v-model="form.mobile"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="座机号："
                        prop="phone">
            <el-input v-model="form.phone"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="性别："
                        prop="sex">
            <el-input v-model="form.sex"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="状态："
                        prop="status">
            <el-input v-model="form.status"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="最后登录："
                        prop="lastLoginTime">
            <el-input v-model="form.lastLoginTime"
                      placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "member-step1",
  props: { detail: Object },
  data() {
    return {
      form: {
        loginName: "",
        password: "",
        oaNo: ""
      }
    };
  },
  methods: {},
  watch: {
    detail: {
      handler(val) {
        let msg = { ...val };
        msg.status = this.detail.status == 0 ? "禁用" : "正常";
        if (val.sex == 1) {
          msg.sex = "男";
        } else if (val.sex == 2) {
          msg.sex = "女";
        } else {
          msg.sex = "未知";
        }
        this.form = msg;
      },
      deep: true
    }
  },
  computed: {
    isDisabied() {
      return this.$route.meta.isDisabied;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
