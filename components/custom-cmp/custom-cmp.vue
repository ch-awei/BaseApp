<template>
  <view class="custom-cmp">
    <h2>自定义组件</h2>
    <slot :user="user"></slot>
    <br>
    <slot name="slotname"></slot>
    <button @click="clickBtn">子传父</button>
  </view>
</template>

<script>
/**
 * easycom组件规范 [https://uniapp.dcloud.net.cn/component/]
 * 只要组件安装在项目的components目录下或uni_modules目录下，
 * 并符合 components/组件名称/组件名称.vue 目录结构。
 * 就可以不用引用、注册，直接在页面中使用。
 */
export default {
  name:"CustomCmp",
  props: {
    customParam: String,
    customNum: {
      type: Number,
      default: 0,
      required: false, // 是否必填
      validator: val => val >= 0 // 若验证false, 控制台会抛出警告
    }
  },
  data() {
    return {
      user: {
        name: 'wei'
      }
    }
  },
  methods: {
    clickBtn() {
      this.$emit('clickBtn', this.user)
      /**
       * uni-app 跨页面、组件通讯 [https://uniapp.dcloud.net.cn/api/window/communication.html]
       * 
       * uni.$emit(eventName: String, params: Object)
       * uni.$on(eventName: String, callback: Function)
       * uni.$once(eventName: String, callback: Function)
       * uni.$off([eventNames: Array|String, callback: Function]) // 不传则全部移除
       */
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/libs/style/mixin.scss';

.custom-cmp {
  @include flex;
  flex-direction: column;
  padding: 2% auto;
  h2 {
    text-align: center;
    padding: 2% auto;
  }
}
</style>
