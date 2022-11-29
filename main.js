import App from './App'
import '@/libs/http/env.js' // 运行环境

// #ifndef VUE3
import Vue from 'vue'

import uView from 'uview-ui'
Vue.use(uView)

import store from '@/store'
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({ ...App, store })

require('@/libs/http/request.js')(app) // 请求封装

import httpApi from '@/libs/http/api.js'
Vue.use(httpApi, app) // api集中管理

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif