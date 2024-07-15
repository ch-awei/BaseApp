<template>
  <view class="mine-detail">
    <h1>{{ title }}</h1>
  </view>
</template>

<script>
import { title as AppTitle } from '@/configs.js'

export default {
  data() {
    return {
      title: ''
    }
  },
  onLoad(params) {
    this.initPage(params)
  },
  methods: {
    initPage(params) {
      this.title = params.title || AppTitle || ''
      uni.setNavigationBarTitle({ title: this.title })
    }
  }
}
</script>

<style lang="scss" scoped>
/* #ifndef APP-PLUS */
page {
  background-color: $uni-bg-color-grey;
}
/* #endif */

.mine-detail {
  /* #ifdef APP-PLUS */
  background-color: $uni-bg-color-grey;
  /* #endif */
  height: 100%;
  h1 {
    text-align: center;
    padding-top: 20%;
  }
}
</style>
