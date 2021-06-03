import httpApi from "./http";
const qs = require("qs");
/*
 * 当请求头 content-type 为application/x-www-form-urlencoded 时 入参需要用 qs.stringify 处理 
 * 
 */
//获取微信配置信息
export const getSigniture = (params, config) =>
  httpApi.post(
    `${location.origin}/wechat_item/rest/platform/wx/signiture`,
    params,
    config
  );

export const shareUrl = (params, config) =>
  httpApi.post(`/wechat_item/rest/platform/wx/shareUrl`, params, config);
export const login = (params, config) =>
  httpApi.post(`/pokemon/api/v2/`, qs.stringify(params), config);
export const getCode = (params, config) =>
  httpApi.get(
    `/wechat_hera_v4/rest/work/childrenWorks?${qs.stringify(params)}`,
    config
  );
export const mockGet = (params, config) =>
  httpApi.get(`${location.origin}/mock/data1`, qs.stringify(params), config);
