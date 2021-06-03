<template>
  <!-- 会员管理 -->
  <div class="member-edit">
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="bread">
      <el-breadcrumb-item :to="{name:'member-list'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="con">
      <step1 @save="save"
             :detail="detail"
             ref="step1"></step1>
    </div>
    <div class="btn-box">
      <el-button class="btn"
                 size="mini"
                 type="primary"
                 @click="save">保&nbsp;&nbsp;存</el-button>
      <el-button class="btn"
                 size="mini"
                 type="info"
                 plain
                 @click="goback">返&nbsp;&nbsp;回</el-button>
    </div>
  </div>
</template>

<script>
import step1 from "@/components/member/step1";
import API from "@/api/api-url";

export default {
  name: "member-edit",
  components: {
    step1,
    userId: ""
  },
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 保存
    async save() {
      let flag = this.$refs.step1.submitForm();
      if (flag) {
        let msg = this.$refs.step1.form;
        msg.userId = this.userId;
        let res = await this.$axios({
          url: API.member.memberEdit,
          method: "post",
          data: msg
        });
        if (res.responseCode === "010200") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.replace({ name: "member-list" });
        } else {
          this.$alert(res.responseMsg || res.message, "修改出错", {
            confirmButtonText: "确定"
          });
        }
      }
    },
    // 查详情
    async getDetail() {
      let userId = this.$route.params.id;
      let res = await this.$axios({
        url: API.member.memberDetail,
        method: "get",
        params: { userId }
      });
      if (res.responseCode !== "010200") {
        this.$message({
          showClose: true,
          message: res.responseMsg || res.message,
          type: "error"
        });
        return;
      } else {
        this.detail = res.responseData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.member-edit {
  height: 100%;
  display: flex;
  flex-flow: column;
  background: #fff;
}
.bread {
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
}
.con {
  padding-top: 50px;
  flex: 1;
}
.btn-box {
  padding: 50px;
  text-align: center;
  .btn {
    margin: 0 10px;
  }
}
</style>
