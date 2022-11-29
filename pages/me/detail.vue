<template>
<view>
    <h1>{{ title }}</h1>
</view>
</template>

<script>
export default {
    data() {
        return {
            title: ''
        }
    },
    onLoad(params) {
        this.init(params)
    },
    methods: {
        init(params) {
            this.title = params.title || 'BaseApp'
            uni.setNavigationBarTitle({ title: this.title })
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
    padding: 5vh 0;
}
</style>