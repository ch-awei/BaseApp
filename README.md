# 移动 APP 基础框架

**`uni-app` + `uview-ui`**

打包前需要先配置 **manifest.json**，特别是**AppID**

生成证书：`keytool -genkey -alias baseapp -keyalg RSA -keysize 2048 -validity 365 -keystore baseapp.keystore`

## 目录结构

- components : 自定义组件
- libs : 一些工具
- pages : 存放页面文件
- static : 静态文件, 如图片等
- store : vuex 全局状态管理
- App.vue : 主页面入口
- configs.js : 配置文件
- main.js : 主程序入口
- manifest.json : 打包配置
- package.json : 依赖配置
- pages.json : 页面配置文件
- uni.scss : 全局样式
