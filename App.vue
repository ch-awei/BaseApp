<script>
export default {
    onLaunch() {
        // 应用启动, 可检查token是否过期以判断是否需要重新登录
        // this.checkToken()
    },
    onShow: function() {},
    onHide: function() {},
    methods: {
        checkToken() {
            this.$u.api.getUserinfo().then(res => {
                if (!res.code || res.code !== 200) return
                this.$store.commit('login', res.data)
            })
        }
    }
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
page {
    background-color: $uni-bg-color-grey;
}
.full-screen { // 铺满
    width: 100vw;
    height: 100vh;
}
</style>
