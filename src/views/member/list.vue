<template>
  <!-- 会员管理 -->
  <div class="member-list">
    <div class="top">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="bread">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索 -->
      <search></search>
      <!-- 新建 -->
      <div class="operate-box">
        <el-button 
            size="mini"
            @click="toCreate">新&nbsp;&nbsp;建</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="con">
      <memberList :list="list"
                  :listLoading="listLoading"></memberList>
    </div>
    <!-- 分页 -->
    <div class="foot">
      <el-pagination
        background
        @prev-click="prevClick"
        @next-click="nextClick"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align: right"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import search from "@/components/member/search";
import memberList from "@/components/member/list";
export default {
  name: "member-list",
  components: { search, memberList },
  data() {
    return {
      pageSizes: [15, 50, 100],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      listLoading: false,
      list: []
    };
  },
  mounted() {
    this.listDataRequest();
  },
  methods: {
    // 新建
    toCreate() {
      this.$router.push({ name: "member-create" });
    },
    prevClick() {
      this.pageNum > 1 ? this.pageNum-- : this.pageNum;
    },
    nextClick() {
      var totalPages = Math.ceil(this.total / this.pageNum);
      this.pageNum < totalPages ? this.pageNum++ : this.pageNum;
    },
    // 切换条数
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
    },
    // 切换页码
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    // list
    listDataRequest() {
      this.$loading.showLoading();
      let arr = [
        {
          userId: 1,
          loginName: "name",
          oaNo: "oa",
          userName: "lili",
          mobile: "13952638456"
        },
        {
          userId: 2,
          loginName: "name2",
          oaNo: "oa",
          userName: "lili2",
          mobile: "13952638456"
        }
      ];
      setTimeout(() => {
        this.list = arr;
        this.$loading.hideLoading();
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.member-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  background: #fff;
}
.bread {
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
}
.operate-box {
  padding: 10px;
  padding-right: 20px;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  background: #fff;
  .el-button {
    @include btnColor2;
  }
}
.con {
  flex: 1;
  overflow: auto;
}
</style>
