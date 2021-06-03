<template>
  <div class="step1">
    <el-row>
      <el-col :span="12">
        <el-form :model="form"
                 :disabled="isDisabied"
                 :rules="rule"
                 ref="form"
                 label-width="170px"
                 size="mini">
          <el-form-item label="登录名:"
                        prop="loginName">
            <el-input v-model="form.loginName"
                      maxlength="20"
                      show-word-limit
                      placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="密码："
                        prop="password">
            <el-input v-model="form.password"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="oa账号："
                        prop="oaNo">
            <el-input v-model="form.oaNo"
                      placeholder="请输入oa账号"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "member-step1",
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    let cheakPassword = (rule, value, callback) => {
      // let reg = /(?!.*\s)(?!^[0-9]+$)(?!^[a-z]+$)(?!^[A-z]+$)(?!^[A-z0-9]+$)^.{6,20}/;
      let reg = /^[0-9a-zA-Z]/;
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      console.log(reg.test(value));
      if (!reg.test(value)) {
        return callback(new Error("密码不包括空格"));
      } else {
        callback();
      }
    };
    return {
      form: {
        loginName: "",
        password: "",
        oaNo: ""
      },
      rule: {
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: cheakPassword, trigger: "blur" }
        ],
        oaNo: [{ required: true, message: "请输入oa账号", trigger: "blur" }]
        // tel: [
        //   {
        //     required: true,
        //     validator: cheakTel,
        //     trigger: "blur"
        //   }
        // ],
      }
    };
  },
  methods: {
    // 表单验证
    submitForm() {
      let flag = false;
      this.$refs["form"].validate(valid => {
        flag = valid;
      });
      return flag;
    }
  },
  watch: {
    detail: {
      handler(val) {
        if (!val || val === {}) {
          return;
        }
        let msg = this.form;
        msg.loginName = val.loginName;
        msg.password = "";
        msg.oaNo = val.oaNo;
        this.form = msg;
      },
      deep: true
    }
  },
  computed: {
    isDisabied() {
      // console.log(this.$route);
      return this.$route.meta.isDisabied;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
