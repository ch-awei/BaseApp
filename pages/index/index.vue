<template>
  <view class="home">
    <h1>首页</h1>
    <image src="/static/uniapp.png" />
  </view>
</template>

<script>
export default {
  // data() {
  //   return {}
  // },
  // onLoad() {}, // 未挂载$el, 已挂载this
  // onReady() {}, // $el,this 都挂载了
  // methods: {}
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: linear-gradient(to bottom right, rgba(102, 204, 255, 0.3), rgba(253, 102, 102, 0.2));
}

/* #ifndef APP-PLUS */
page {
  @extend .bg-img;
}
/* #endif */

.home {
  /* #ifdef APP-PLUS */
  @extend .bg-img;
  /* #endif */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 10% auto;
  }
  image {
    width: 10em;
    height: 10em;
    margin: 10% auto;
  }
}

// https://www.runoob.com/cssref/css3-pr-mediaquery.html
// @media screen and (max-width: 300px) { // 小于300px
//   page {
//     background-color: lightblue;
//   }
// }
</style>
