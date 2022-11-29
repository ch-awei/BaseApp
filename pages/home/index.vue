<template>
<view class="home">
    <h1>首页</h1>
    <my-cmp>
        默认插槽
        <template #theslot>
            指定插槽
        </template>
    </my-cmp>
</view>
</template>

<script>
import mixin from '@/libs/mixin/index.js'
export default {
    mixins: [mixin],
    data() {
        return {}
    },
    onLoad() {
        this.checkUser()
    }
}
</script>

<style lang="scss" scoped>
page {
    background-image: linear-gradient(to bottom right, rgba(102, 204, 255, 0.3), rgba(253, 102, 102, 0.2));
}
h1 {
    text-align: center;
    padding: 5vh 0;
}
</style>