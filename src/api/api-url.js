const API = {
  // 登录
  login: "/member/auth/login",
  // 获取路由列表
  getRouter: "member/resource/user/menu",
  member: {
    memberList: "member/user/list",
    memberAdd: "member/user/add",
    memberEdit: "member/user/edit",
    memberDetail: "member/user/get"
  },
  role: {
    roleList: "member/role/list",
    roleAdd: "member/role/add",
    roleEdit: "member/role/edit",
    roleDetail: "member/role/get"
  },
  menu: {
    menuList: "member/resource/list",
    menuAdd: "member/resource/add",
    menuEdit: "member/role/edit",
    menuDetail: "member/role/get"
  },
  record: {
    logOn: {
      platformList: "api/open/applyInfo",
      platformChart: "api/open/applyInfo"
    }
  }
};

export default API;
