export default {
    state: {
        token: uni.getStorageSync('uniapp-token') || '',
        roles: uni.getStorageSync('uniapp-roles') || '',
        info: uni.getStorageSync('uniapp-userInfo') || {}
    },
    getters: {},
    mutations: {
        login(state, data) {
            if (!data.token) return state.info = data.user // 体验
            uni.setStorageSync('uniapp-token', data.token)
            uni.setStorageSync('uniapp-roles', data.roles)
            uni.setStorageSync('uniapp-userInfo', data.user)
            state.token = data.token
            state.roles = data.roles
            state.info = data.user
            if (data.username && data.password) {
                uni.setStorageSync('uniapp-username', data.username)
                uni.setStorageSync('uniapp-password', data.password)
            } else {
                uni.removeStorageSync('uniapp-username')
                uni.removeStorageSync('uniapp-password')
            }
        },
        logout(state) {
            uni.removeStorageSync('uniapp-token')
            uni.removeStorageSync('uniapp-roles')
            uni.removeStorageSync('uniapp-userInfo')
            state.token = ''
            state.roles = ''
            state.info = {}
        }
    },
    actions: {}
}