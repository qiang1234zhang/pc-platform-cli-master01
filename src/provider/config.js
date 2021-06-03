let env = process.env.VUE_APP_CUSTROM_ENV; //环境  development 开发  test 测试环境  pre 预生产 production 生产
// td 插码和大数据插码配置迁移到  public/reference/td 和tracker 中
/** td插码配置说明
 * customAppiD : object/sting 配置td_appid 
 * object: 自定义配置td_appid （ 三个环境有哪个配置哪个 生产和测试要对应）
 * {
      host："", //生产环境域名 例 "m.tk.cn"  多个域名逗号隔开 "m.tk.cn,car.tk.cn"  必填              
      wx: "", //生产微信 td_appId
      t_wx: "", //测试微信  td_appId
      app: "", //生产app td_appId
      t_app: "", //测试app  td_appId
      wap: "", //生产wap td_appId
      t_wap: "", //测试wap  td_appId         
    }
 * string:  部门渠道名 可选值 "直营"/"大健康"/"车险"/"理赔"/"互联网事业部"/"支付"
 * 完成td appid 信息参照 wiki（）
 */

class myConfig {
  constructor() {
    return this.changeEnv();
  }
  changeEnv() {
    let config = {
      env: env
    };
    switch ("test" || env) {
      case "development":
        return {
          host: location.origin,
          baseUrl: "/",
          ...config
        };
      case "test":
        return {
          host: "//ecuat.tk.cn",
          baseUrl: "/",
          ...config
        };
      case "pre":
        return {
          host: "//m.tk.cn",
          baseUrl: "/",
          ...config
        };
      case "production":
        return {
          host: "//m.tk.cn",
          baseUrl: "/",
          ...config
        };
      default:
        return {
          host: "//ecuat.tk.cn",
          baseUrl: "/",
          ...config
        };
    }
  }
}
export default new myConfig();
