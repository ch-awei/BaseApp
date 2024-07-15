<script>
import { cacheKeyPre } from '@/configs.js'

export default {
  onLaunch() {
    // 应用启动, 可检查token是否过期以判断是否需要重新登录
    this.checkUser()
  },
  // onHide() {}, // 应用退到后台
  // onShow() {}, // 应用从后台切回前台
  methods: {
    checkUser() {
      if (!uni.getStorageSync(cacheKeyPre + '-token')) {
        uni.reLaunch({ url: '/pages/login' })
        return
      }
      this.$store.dispatch('GetUserInfo')
        .then(res => {
          uni.switchTab({ url: '/pages/index/index' })
        })
    }
  }
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
page {
  min-height: 100%;
}
</style>
