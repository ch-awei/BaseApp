<template>
<view class="mycmp">
    <h2>自定义组件</h2>
    <p>同名文件夹下的组件不需要导入即可全局使用</p>
    <slot></slot>
    <br>
    <slot name="theslot"></slot>
</view>
</template>

<script>
export default {
    name:"my-cmp",
    props: [],
    data() {
        return {};
    }
}
</script>

<style lang="scss" scoped>
.mycmp {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vh 0;
    h2 {
        text-align: center;
        padding: 1vh 0;
    }
}
</style>