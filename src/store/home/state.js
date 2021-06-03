const state = {
  isCollapsed: false, // 控制侧边栏折叠true--默认折叠
  homeFlag: true, //是否为首页
  defaultOpeneds: ["2"], // 默认展开
  pathCode: {
    "/product-query*": "1_0_1",
    "/product-query-modify": "1_0_1"
  }, //路径对应 code码 当前页面子页面码与父页面码相同
  elementCode: {
    "1": "产品",
    "1_0_1": "产品查询",
    "1_0_1_1": "编辑"
  } //权限列表 后台接口返回的当前用户的菜单以及按钮权限 编码 数数组
};

export default state;
