const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  // baseUrl: "/platform/recruit/",
  // baseUrl: "/healthManager/",
  // baseUrl: "/tk-online/platform/overtime-settlement/",
  baseUrl:
    process.env.NODE_ENV === "development"
      ? ""
      : "/tk-online/platform/member-management/",
  // 将构建好的文件输出到哪里
  outputDir: "dist",
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });
  },
  configureWebpack: {
    output: {
      filename: "[name].[hash].bundle.js"
    },
    plugins: [
      new SpritesmithPlugin({
        // 目标小图标
        src: {
          cwd: path.resolve(__dirname, "./src/assets/img/icons"),
          glob: "*.png"
        },
        // 输出雪碧图文件及样式文件
        target: {
          image: path.resolve(__dirname, "./dist/sprites/sprite.png"),
          css: path.resolve(__dirname, "./dist/sprites/sprite.css")
        },
        // 样式文件中调用雪碧图地址写法
        apiOptions: {
          cssImageRef: "../sprites/sprite.png"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      })
    ]
  },

  // vue-loader 选项
  // 查阅 https://vue-loader.vuejs.org/zh-cn/options.html
  // vueLoader: {},

  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处 oader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        prependData: `
          @import "./src/assets/css/global.scss";
        `
      },
      postcss: {
        plugins: [
          /* require("postcss-px2rem")({
            remunit: 100 // 换算基准
          }) */
          // postcss-plugin-px2rem 配置参考：https://www.npmjs.com/package/postcss-plugin-px2rem
          require("postcss-plugin-px2rem")({
            rootValue: 192, // 换算基数,默认100,即1rem = (设置的基数)100px
            // unitPrecision: 5, // 允许ren单位增长到的十进制数字
            //exclude: /(node_modules)/, // 排除某个文件夹不被转换
            // selectorBlackList: [
            //   "el-time-panel",
            //   "el-time-spinner__wrapper",
            //   "el-scrollbar__wrap",
            //   "el-time-spinner__item",
            //   "el-time-panel__content::before",
            //   "el-time-spinner__list::after",
            //   "el-time-spinner__list::before"
            // ], // 要忽略并保留为 px 的选择器
            mediaQuery: false, // (布尔值) 允许在媒介查询中转换px
            minPixelValue: 0 // 默认0,设置要替换的最小像素值
            //33
          })
        ]
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: "http://pctest.tk.cn"
    // proxy: {
    // "/wechat_item/*": {
    //   target: "http://ecuat.tk.cn",
    //   changeOrigin: true
    // },
    // "/pokemon/*": {
    //   target: "http://ecuat.tk.cn",
    //   changeOrigin: true
    // },
    // "/wechat_hera_v4/*": {
    //   target: "http://ecuat.tk.cn",
    //   changeOrigin: true
    // },
    // "/mock/*": {
    //   target: "http://localhost:9999",
    //   secure: false,
    //   pathRewrite: {
    //     "^/mock": ""
    //   }
    // },
    // "/api": {
    //   target: "http://ecuat.tk.cn",
    //   changeOrigin: true,
    //   pathRewrite: {
    //     "^/api": ""
    //   }
    // }
    // } // string | Object
    // before: app => {
    //   // `app` 是一个 express 实例
    // }
  },

  // 三方插件的选项
  pluginOptions: {
    // ...
  }
};
