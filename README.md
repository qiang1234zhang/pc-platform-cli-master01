# PC端脚手架
### 目录说明
src
    ├─api
    ├─assets
    │  ├─css
    │  │  ├─index.css    ------- 样式格式化
    │  │  └─global.scss  ------- 全局样式	
    │  ├─iconfont
    │  ├─image
    │  ├─json
    │  └─lib
    ├─components
    │  ├─common             ---------公共组件
    │  ├─member             ---------member的组件
    │  ├─home				---------home的组件
    |  └─tk-menu		    ---------左侧导航 
    ├─provider 
    │  ├─api.js             ---------API接口
    │  ├─config.js          ---------config 配置
    │  ├─get-component.js	---------引用.vue文件方法
    │  ├─get-component.js	---------引用.vue文件方法
    │  ├─until.js        	---------公共方法
    ├─router
    ├─store
    │  ├─home			-----------	存储路由等公共配置
    │  └─modules        ----------- store 模块
    └─views
        ├─member        --------------------演示页面
        └─other			home:页面壳子(上下结构)，home-aside:页面壳子(左右结构),welcome：欢迎页

#### 公共组件
在components => common 有封装的公共组件:dialog/drawer/button 使用时作为组件引用;
loading 通过this.$showLoading()方法与this.$hideLoading 使用;
toast 通过 this.$toast.changeShow("内容"，“时间”); 来使用;  
message 通过  this.$msg.showSuccessMessage("内容"，“时间”); this.$msg.showErrorMessage("内容"，“时间”); 来使用

#### 
部署时需要在vue.config.js 及router 中替换baseUrl