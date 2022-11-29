module.exports = (vm) => {
    uni.$u.http.setConfig((config) => {
        config.baseURL = process.url.development
        config.custom.loading = 1000 // 超过1秒则显示遮罩层
        config.custom.timeout = 10000 // 超过10秒请求超时
        return config
    })
    // 请求拦截
    uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
        config.data = config.data || {}
        if (!['auth/code','auth/login'].includes(config.url) && config?.custom?.auth!==false) {
            config.header.Authorization = vm.$store.state.token
        }
        if (config?.custom?.loading) {
            config.custom.showloading = setTimeout(() => {
                uni.showLoading({ mask: true, title: '请稍等 ...' })
            }, config.custom.loading)
            if (config?.custom?.timeout) {
                config.custom.timeoutid = setTimeout(() => {
                    uni.hideLoading() // 关闭遮罩层
                }, config.custom.timeout)
            }
        }
        return config
    }, config => { // 可使用async await 做异步操作
        return Promise.reject(config)
    })
    // 响应拦截
    uni.$u.http.interceptors.response.use((response) => { // 可使用async await 做异步操作
        console.log(response)
        clearTimeout(response.config?.custom?.showloading)
        clearTimeout(response.config?.custom?.timeoutid)
        uni.hideLoading()
        const data = response.data || {}
        /* const custom = response.config?.custom // 自定义参数
        if (!['auth/code','auth/login'].includes(response.config.url) && data.code !== 200) {
            if (custom.toast !== false) uni.$u.toast(data.message)
            // 如果需要catch返回进行reject，否则返回一个pending中的promise，请求不会进入catch中
            if (custom?.catch) return Promise.reject(data)
            else return new Promise(() => { })
        } // */
        return data
    }, (response) => { // statusCode !== 200
        clearTimeout(response.config?.custom?.showloading)
        clearTimeout(response.config?.custom?.timeoutid)
        uni.hideLoading()
        if (response.statusCode === 401) {
            uni.showToast({ icon: 'none', title: '身份已过期，请重新登录' })
            vm.$store.commit('logout')
            setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 1000)
            return
        } else {
            uni.showToast({ icon: 'none', title: response.data?.message||'请求出错' })
        }
        return Promise.reject(response)
    })
}