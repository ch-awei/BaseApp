<template>
  <view class="login" :style="{ height: windowHeight > 0 ? `${windowHeight}px` : '100%' }">
    <u-toast ref="uToast" />
    <image class="logo" src="/static/uniapp.png" />
    <h2>uni-app</h2>
    <view class="login__form">
      <view class="login__form__item" v-for="(item, key) in list" :key="key">
        <u-icon :name="item.icon" size="35" />
        <input
          v-model="form[key]"
          :focus="focus[key]"
          :style="{
            width: key === 'code' ? '36%' : '80%',
            'box-shadow': focus[key] ? '0 0 6px 2px rgba(0, 170, 255, 0.3)' : '0 0 8px 1px rgba(0, 0, 0, 0.1)'
          }"
          :placeholder="item.txt"
          :password="item.ispwd"
          @blur="$set(focus, key, false)"
          @focus="$set(focus, key, true)"
        />
        <image v-if="key === 'code'" class="login__form__captch" :src="form.img" @click="getCaptcha" />
      </view>
    </view>
    <checkbox-group @change="checkboxChange">
      <checkbox value="remenber" :checked="form.remenber">记住我</checkbox>
    </checkbox-group>
    <u-button type="primary" shape="circle" text="登 录" @click="handleLogin" />
    <u-button type="success" shape="circle" text="去体验" icon="arrow-right-double" @click="gotoExperience" />
    <p>xx 信息科技有限公司</p>
  </view>
</template>

<script>
// 加密/解密工具, 使用前需配置公钥
import { encrypt, decrypt } from '@/libs/utils/encrypt.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      windowHeight: 0,
      focus: {},
      list: {
        'username': { txt: '用户名', icon: 'account' },
        'password': { txt: '密码', icon: 'lock', ispwd: true },
        'code': { txt: '验证码', icon: 'photo' }
      },
      form: {
        img: '/static/captch.png'
      }
    }
  },
  computed: {
    ...mapState({
      remenber: state => state.user.remenber
    })
  },
  // onLoad() {
  //   // 加载完毕, 初始化数据, 如: 获取验证码、检查是否缓存记住密码
  //   this.initData()
  // },
  onReady() {
    // console.log(uni.getWindowInfo())
    this.windowHeight = uni?.getWindowInfo()?.windowHeight ?? 0
  },
  methods: {
    initData() {
      const { username, password } = this.remenber
      if (username && password) {
        this.form = {
          ...this.form,
          username,
          password: decrypt(password),
          remenber: true
        }
      }
      this.getCaptcha()
    },
    getCaptcha() { // 获取验证码
      this.$u.api.getCaptcha()
        .then(({ img, uuid }) => {
          Object.assign(this.form, { img, uuid })
        })
    },
    checkboxChange({ detail }) { // 多选框变化
      this.$set(this.form, 'remenber', detail?.value.length ? true : false)
    },
    handleLogin() { // 登录
      const params = { ...this.form }
      const tips = {
        username: '请输入用户名',
        password: '请输入密码',
        code: '请输入验证码',
      }
      for (const k in tips) {
        if (!params[k]) return uni.showModal({
          title: '提示',
          content: tips[k],
          complete: () => {
            this.$set(this.focus, k, true)
          }
        })
      }
      return this.$refs.uToast.show({ type: 'warning', message: '暂未开放，请去体验' })
      delete params.img
      params.password = encrypt(params.password)
      this.$store.dispatch('Login', params)
        .then(res => {
          this.$refs.uToast.show({ type: 'success', message: '登录成功' })
          return this.$store.dispatch('GetUserInfo')
        })
        .then(res => {
          uni.switchTab({ url: '/pages/index/index' })
        })
        .catch(err => {
          this.getCaptcha()
          const { message, msg } = err.data || err
          uni.showModal({
            title: '提示',
            content: message || msg || '发生未知错误，请稍后重试或联系管理员'
          })
        })
    },
    gotoExperience() { // 体验
      const nowTime = +new Date().getTime().toString()
      this.$store.dispatch('Login', {
        experience: true,
        info: {
          username: nowTime,
          nickname: '游客'.concat(nowTime),
          phone: '13812345678',
          email: 'email@163.com'
        }
      }).then(() => {
        this.$refs.uToast.show({
          type: 'success',
          message: '游客体验',
          duration: 1000,
          complete: () => {
            uni.switchTab({ url: '/pages/index/index' })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/libs/style/mixin.scss';

.login {
  @include flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: $uni-bg-color;
  padding-top: 5%;
  box-sizing: border-box;
  position: relative;
  h2 {
    margin-bottom: 10%;
  }
  .logo {
    width: 30vw;
    height: 30vw;
    margin: 10% 0 5% 0;
  }
  &__form {
    width: 90%;
    &__item {
      @include flex;
      padding: 0.5em 1em;
      input {
        height: 2em;
        margin-left: 0.5em;
        padding: 0.3em 1em;
        border-radius: 2em;
      }
    }
    &__captch {
      height: 2.5em;
      width: 43%;
      margin: 0 0 0 1em;
    }
  }
  uni-checkbox-group {
    width: 90%;
    padding: 2em 0 2em 3em;
  }
  .u-button {
    width: 80vw;
    margin-top: 1em;
  }
  p {
    text-align: center;
    color: $uni-text-color-grey;
    font-size: small;
    position: absolute;
    bottom: 2em;
  }
}
</style>
