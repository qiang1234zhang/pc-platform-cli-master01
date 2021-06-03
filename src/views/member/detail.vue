<template>
  <!-- 会员管理 -->
  <div class="member-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="bread">
      <el-breadcrumb-item :to="{name:'member-list'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="con">
      <step1 ref="step1"
             :detail="detail"></step1>
    </div>
    <div class="btn-box">
      <el-button class="btn"
                 plain
                 type="info"
                 size="mini"
                 @click="goback">返&nbsp;&nbsp;回</el-button>
    </div>
  </div>
</template>

<script>
import step1 from "@/components/member/step1-detail";
import API from "@/api/api-url";

export default {
  name: "member-detail",
  components: {
    step1
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
.member-detail {
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
}
</style>
