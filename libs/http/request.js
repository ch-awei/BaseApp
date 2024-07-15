import { baseURL } from '@/configs.js'

const IsDev = process.env?.NODE_ENV.startsWith('dev')

module.exports = (vm) => {
  // 基础配置
  uni.$u.http.setConfig((config) => {
    config.baseURL = IsDev ? baseURL.dev : baseURL.prod
    config.custom.loading = 1000 // 超过1秒则显示遮罩层
    config.custom.timeout = 10000
    return config
  })

  // 请求拦截
  uni.$u.http.interceptors.request.use((config) => {
    config.data = config.data || {}
    if (!['auth/code', 'auth/login'].includes(config.url) && config?.custom?.noToken != true) {
      config.header.Authorization = vm.$store?.getters?.token
    }
    if (config?.custom?.loading) {
      config.custom.showloading = setTimeout(() => {
        uni.showLoading({ mask: true, title: '加载中...' })
      }, config.custom.loading)
      if (config?.custom?.timeout) {
        config.custom.timeoutid = setTimeout(uni.hideLoading, config.custom.timeout)
      }
    }
    return config
  }, config => {
    return Promise.reject(config)
  })

  // 响应拦截
  uni.$u.http.interceptors.response.use((response) => {
    if (IsDev) {
      console.info(response)
    }
    clearTimeout(response.config?.custom?.showloading)
    clearTimeout(response.config?.custom?.timeoutid)
    uni.hideLoading()
    const data = response.data || response
    /* 自定义拦截
    const custom = response.config?.custom // 自定义参数
    if (data.code !== 200) {
      return Promise.reject(data)
    }
    // */
    return data
  }, (error) => { // statusCode !== 200
    clearTimeout(error.config?.custom?.showloading)
    clearTimeout(error.config?.custom?.timeoutid)
    uni.hideLoading()
    const { message, msg } = error.data || error
    switch (error.statusCode) {
      case 401:
        uni.showToast({ icon: 'none', title: '身份已过期，请重新登录' })
        vm.$store.dispatch('Logout')
        setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 1000)
        return
      default: uni.showToast({ icon: 'none', title: message || msg || '请求出错，请联系管理员' })
    }
    return Promise.reject(error)
  })
}
