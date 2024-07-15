<template>
  <view class="mine">
    <view class="info">
      <view class="info__base">
        <u-avatar src="/static/logo.png" size="60" />
        <view class="info__base__text">
          <h3>{{ userInfo.nickname }}</h3>
          <!-- <p>{{ userInfo.age || '20' }}</p> -->
        </view>
      </view>
      <view class="info__contact">
        <u-icon name="phone" :label="userInfo.phone" />
        <u-icon name="email" :label="userInfo.email" />
      </view>
    </view>
    <view class="other">
      <p v-for="(item, i) in listCell" :key="i" class="cell-item" @click="toDetail(item)">
        {{ item }}
        <u-icon name="arrow-right" />
      </p>
    </view>
    <view class="logout">
      <u-button
        plain
        type="warning"
        shape="circle"
        @click="onQuit"
      >退 出</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      listCell: ['设置', '修改密码', '更新', '关于']
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.uinfo || {}
    }
  },
  methods: {
    toDetail(title) {
      // uni.$u.route('/pages/mine/detail', { title }) // uview组件库内置方法； url必须全路径
      uni.navigateTo({ url: `./detail?title=${title}` })
    },
    onQuit() {
      uni.showModal({
        title: '提示',
        content: '确认退出登陆？',
        success: res => {
          if (res.confirm) uni.reLaunch({
            url: '/pages/login',
            success: () => {
              this.$store.dispatch('Logout')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/libs/style/mixin.scss';

/* #ifndef APP-PLUS */
page {
  background: $uni-bg-color-grey;
}
/* #endif */
/* #ifdef APP-PLUS */
.mine {
  height: 100vh;
  background: $uni-bg-color-grey;
}
/* #endif */

.info {
  box-sizing: border-box;
  width: 100vw;
  padding: 1em;
  background-color: $uni-bg-color;
  box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.1);
  &__base {
    @include flex;
    padding-left: 1em;
    &__text {
      padding-left: 2em;
    }
  }
  &__contact {
    @include flex(space-around);
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
.float-card {
  width: 94vw;
  margin: 1em auto;
  background-color: $uni-bg-color;
  box-shadow: 0 0 8px 2px rgba(102, 204, 255, 0.1);
  padding: 1em;
  box-sizing: border-box;
  border-radius: $uni-border-radius-lg;
}
.other {
  @extend .float-card;
  p {
    padding: 0 0.5em 0.6em 0.5em;
    margin-bottom: 0.6em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    span {
      font-size: smaller;
      color: $uni-text-color-grey;
    }
    &:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: 0;
    }
  }
  .cell-item {
    @include flex(space-between);
  }
}
.logout {
  margin-top: 2em;
  padding: 0 30vw;
}
</style>
