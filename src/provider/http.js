import axios from "axios";
// import Vue from "vue";
import router from "@/router";
// import { getCookie } from "../util/common-util.js";
// import myConfig from "./config";
import { showLoading, hideLoading } from "@/provider/loading.js";
let qs = require("qs");
let baseUrl =
  window.location.origin ||
  window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port || "");
baseUrl += "/";
const httpApi = axios.create({
  //baseURL: process.env.BASE_API,
  //baseURL: `http:${myConfig.host}${myConfig.baseUrl}`,
  //baseURL: "/api",
  // baseURL: "http://100.130.210.65:8080",
  baseURL: baseUrl,
  timeout: 10000
});
httpApi.defaults.headers["Content-Type"] = "application/json";
// httpApi.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

/**
 * 请求拦截
 */
httpApi.interceptors.request.use(
  config => {
    config.headers.Authorization = JSON.parse(
      localStorage.getItem("Authorization")
    );
    // console.log("请求拦截----", config);
    if (config.loading !== false) {
      showLoading();
    }
    // config.headers["token"] =
    //   sessionStorage.getItem("token") ||
    //   localStorage.getItem("token") ||
    //   getCookie("token") ||
    //   "";
    return config;
  },
  error => {
    console.error("request", qs.parse(error));
    hideLoading();
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
httpApi.interceptors.response.use(
  response => {
    // console.log("响应拦截----", response);
    if (response.config.loading !== false) {
      hideLoading();
    }
    if (response.data.code === "101-20-0103") {
      router.push("/");
    }
    return response.data;
  },
  error => {
    hideLoading();
    let errMsg = {};
    /* console.error(
      "response",
      qs.parse(error).response ? qs.parse(error).response : qs.parse(error)
    ); */
    if (qs.parse(error).response) {
      switch (qs.parse(error).response.status) {
        case 400:
          errMsg.message = "请求错误(400)";
          break;
        case 401:
          errMsg.message = "未授权，请重新登录(401)";
          break;
        case 403:
          errMsg.message = "拒绝访问(403)";
          break;
        case 404:
          errMsg.message = "请求出错(404)";
          break;
        case 408:
          errMsg.message = "请求超时(408)";
          break;
        case 500:
          errMsg.message = "服务器错误(500)";
          break;
        case 501:
          errMsg.message = "服务未实现(501)";
          break;
        case 502:
          errMsg.message = "网络错误(502)";
          break;
        case 503:
          errMsg.message = "服务不可用(503)";
          break;
        case 504:
          errMsg.message = "网络超时(504)";
          break;
        case 505:
          errMsg.message = "HTTP版本不受支持(505)";
          break;
        default:
          errMsg.message = `连接出错(${qs.parse(error).response.status})!`;
      }
      errMsg.status = qs.parse(error).response.status;
      errMsg.url = qs.parse(error).response.config.url;
    }
    console.error("response", errMsg);
    return errMsg;
    // return qs.parse(error).response
    //   ? qs.parse(error).response
    //   : qs.parse(error);
  }
);

export default httpApi;

// 处理get请求
// const httpGet = async (url, params, config = {}) =>
//   await httpApi.get(url, { ...config, params });
// // 处理post请求
// const httpPost = (url, params, config = {}) =>
//   httpApi.post(url, params, config);
// export { httpGet, httpPost };
