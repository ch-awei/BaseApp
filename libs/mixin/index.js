import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            userInfo: state => state.user.info
        })
    },
    methods: {
        checkUser() {
            const checkToken = true // await this.$u.api.getUserinfo()
            if (!this.userInfo.username || !checkToken) uni.showModal({
                title: '提示',
                content: '用户信息缺失, 请重新登陆',
                success: res => {
                    // res.confirm -> 确认
                    // res.cancel -> 取消
                },
                complete: () => {
                    this.$store.commit('logout')
                    // 无论如何 -> 关闭所有页面 -> 跳转登陆页
                    uni.reLaunch({ url: '/pages/index/index' })
                }
            })
        }
    }
}