import Vue from "vue";
import app from "@/app.vue";
import router from "@/router/index";
import store from "@/store/index";
// css样式
import "@/assets/css/index.css";
import "@/assets/iconfont/iconfont.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "@/provider/http.js";
import { showLoading, hideLoading } from "@/provider/loading.js";
import Toast from "@/components/common/com-toast/";
import Loading from "@/components/common/com-loading/";
import Msg from "@/components/common/com-message";
// 引入屏幕适配文件
import "lib-flexible/flexible";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Msg);
Vue.prototype.$axios = axios;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount("#app");
