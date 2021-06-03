<template>
  <!-- lastLoginTime: null
loginName: "123"
mobile: null
oaNo: "123"
phone: null
sex: null
status: 1
userId: 41
userName: null -->
  <div class="list-box">
    <el-table stripe
              header-align="center"
              cell-class-name="table-cell"
              header-cell-class-name="table-header"
              empty-text="没有找到匹配的记录"
              v-loading="listLoading"
              :data="showList">
      <!-- <el-table-column type="index"
                       align="center"></el-table-column> -->
      <el-table-column prop="loginName"
                       align="center"
                       label="登录名"></el-table-column>
      <el-table-column prop="oaNo"
                       align="center"
                       label="oa账号"></el-table-column>
      <el-table-column prop="userName"
                       align="center"
                       label="用户名"></el-table-column>
      <!-- <el-table-column prop="userId"
                       align="center"
                       label="用户ID"></el-table-column> -->
      <el-table-column prop="mobile"
                       align="center"
                       label="手机号"></el-table-column>
      <!-- <el-table-column prop="phone"
                       align="center"
                       label="座机号"></el-table-column>
      <el-table-column prop="sex"
                       align="center"
                       label="性别"></el-table-column>
      <el-table-column prop="statusTxt"
                       align="center"
                       label="状态"></el-table-column> -->
      <!-- <el-table-column prop="lastLoginTime"
                       align="center"
                       label="最后登录"></el-table-column> -->
      <el-table-column label="操作"
                       width="160"
                       align="center"
                       fixed="right">
        <template slot-scope="scope">
          <el-button class="btn detail-btn"
                     size="mini"
                     plain
                     type="info"
                     @click="toDetail(scope)">详情</el-button>
          <el-button class="btn edit-btn"
                     size="mini"
                     plain
                     type="primary"
                     @click="toEdit(scope)">编辑</el-button>
          <el-button class="btn del-btn"
                     plain
                     size="mini"
                     type="danger"
                     v-if="scope.row.status==1"
                     @click="toOff(scope)">禁用</el-button>
          <el-button class="btn del-btn"
                     plain
                     v-if="scope.row.status==0"
                     size="mini"
                     type="success"
                     @click="toOn(scope)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <com-dialog 
      title = "编辑"
      :obj = "obj"
      @closeDialog = "closeDialog"
      v-if = "isShow"
      > 
        <step1 @save="save"
        :detail="detail"
        ref="step1"></step1>
    </com-dialog>
    <com-drawer
      :obj = "drawerObj"
      @closeDrawer = "closeDrawer"
      v-if = "Show"
      > 
      <template slot = "footer"></template>
        <step1 ref="step1"
          :detail="detail">
        </step1>
    </com-drawer>
  </div>
</template>

<script>
import comDialog from "@/components/common/com-dialog";
import comDrawer from "@/components/common/com-drawer";
import step1 from "@/components/member/step1-detail";
export default {
  name: "member-list-component",
  props: {
    list: Array,
    listLoading: Boolean
  },
  components: {
    comDialog,
    comDrawer,
    step1
  },
  data() {
    return {
      Show: false,
      isShow: false,
      drawerObj: {},
      obj: {},
      detail: {}
    };
  },
  methods: {
    // 编辑
    toEdit(scope) {
      let id = scope.row.userId;
      // this.$router.push({ name: "member-edit", params: { id: id } });
      this.obj.id = id;
      this.isShow = true;
      console.log(this.isShow);
    },
    confirmDialog(data) {
      console.log(data, "数据");
      this.$msg.showSuccessMessage("编辑成功", 3000);
      this.isShow = false;
    },
    closeDialog() {
      this.isShow = false;
    },
    goback() {
      this.isShow = false;
    },
    // 详情
    toDetail(scope) {
      let id = scope.row.userId;
      console.log(id);
      // this.$router.push({ name: "member-detail", params: { id: id } });
      this.drawerObj.id = id;
      this.Show = true;
    },
    confirmDrawer(data) {
      console.log(data);
      this.Show = false;
    },
    closeDrawer() {
      this.Show = false;
    },
    save() {},
    // 禁用
    toOff(scope) {
      let id = scope.row.userId;
      console.log(id);
      // let id = this.list[index].id;
    },
    // 启用
    toOn(scope) {
      let id = scope.row.userId;
      console.log(id);
      // let id = this.list[index].id;
    }
  },
  computed: {
    showList() {
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        // 性别 sex：0是未知，1是男，2是女
        let sex = item.sex + "";
        if (sex === "1") {
          item.sex = "男";
        } else if (sex === "2") {
          item.sex = "女";
        } else {
          item.sex = "未知";
        }
        // 状态 status：0是禁用，1：是正常
        let status = item.status;
        item.statusTxt = status == 0 ? "禁用" : "正常";
      }
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-box {
  width: 100%;
  background: #fff;
}
.btn {
  padding: 3px 5px;
}
</style>
