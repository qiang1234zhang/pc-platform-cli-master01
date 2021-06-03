<template>
  <!-- 会员管理 -->
  <div class="member-create">
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="bread">
      <el-breadcrumb-item :to="{name:'member-list'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="con">
      <step1 @save="save"
             :detail="{}"
             ref="step1"></step1>
    </div>
    <div class="btn-box">
      <com-button class="btn"
                  className="btn2"
                  size="mini"
                  icon="el-icon-check"
                  text="保 存"
                  @handleClick="save"></com-button>
      <com-button class="btn"
                 className="btn1"
                 size="mini"
                 @handleClick="goback"
                 text="返 回"
                 disabled
                 ></com-button>
    </div>
  </div>
</template>

<script>
import step1 from "@/components/member/step1";
import comButton from "@/components/common/com-button";
import API from "@/api/api-url";
export default {
  name: "member-create",
  components: {
    step1,
    comButton
  },
  data() {
    return {};
  },
  mounted() {
    this.$showLoading();
    setTimeout(() => {
      this.$hideLoading();
    }, 3000);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 保存
    async save() {
      console.log("保存");
      this.$toast.changeShow();
      let flag = this.$refs.step1.submitForm();
      if (flag) {
        let msg = this.$refs.step1.form;

        let res = await this.$axios({
          url: API.member.memberAdd,
          method: "post",
          data: msg
        });
        if (res.responseCode === "010200") {
          this.$message({
            message: "新建成功",
            type: "success"
          });
          this.$router.replace({ name: "member-list" });
        } else {
          this.$alert(res.responseMsg || res.message, "新建出错", {
            confirmButtonText: "确定"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.member-create {
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
