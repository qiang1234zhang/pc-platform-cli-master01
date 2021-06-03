/* module.exports = {
  plugins: [
    require("postcss-plugin-px2rem")({
      rootValue: 192, // 换算基数，默认100
      // unitPrecision: 5, // 允许ren单位增长到的十进制数字
      //exclude: /(node_modules)/, // 排除某个文件夹不被转换
      selectorBlackList: [
        "el-time-panel",
        "el-time-spinner__wrapper",
        "el-scrollbar__wrap",
        "el-time-spinner__item",
        "el-time-panel__content::before",
        "el-time-spinner__list::after",
        "el-time-spinner__list::before"
      ], // 要忽略并保留为 px 的选择器
      mediaQuery: false, // (布尔值) 允许在媒介查询中转换px
      minPixelValue: 0 // 默认0,设置要替换的最小像素值
    })
  ]
};
 */