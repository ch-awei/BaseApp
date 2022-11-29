<template>
<view>
    <view class="info">
        <view class="info_base">
            <u-avatar src="/static/wei.JPG" size="60" />
            <view class="info_base_text">
                <h3>{{ userInfo.nickname }}</h3>
                <!-- <p>{{ userInfo.age || '20' }}</p> -->
            </view>
        </view>
        <view class="info_contact">
            <u-icon name="phone" :label="userInfo.phone" />
            <u-icon name="email" :label="userInfo.email" />
        </view>
    </view>
    <view class="other">
        <p v-for="item in list" :key="item"
            class="cell-item"
            @click="toDetail(item)">
            {{ item }}
            <u-icon name="arrow-right"/>
        </p>
    </view>
    <view class="logout">
        <u-button
            plain
            type="warning"
            shape="circle"
            @click="quit"
        > 退 出 </u-button>
    </view>
</view>
</template>

<script>
import mixin from '@/libs/mixin/index.js'
export default {
    mixins: [mixin],
    data() {
        return {
            list: ['设置', '修改密码', '更新', '关于']
        }
    },
    onLoad() {
        this.checkUser()
    },
    methods: {
        toDetail(item) {
            uni.$u.route('/pages/me/detail', { title: item })
        },
        quit() {
            uni.showModal({
                title: '提示',
                content: '确定退出登陆？',
                success: res => {
                    if (res.confirm) uni.reLaunch({
                        url: '/pages/index/index',
                        success: () => {
                            this.$store.commit('logout')
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.info {
    box-sizing: border-box;
    width: 100vw;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
    &_base {
        display: flex;
        padding-left: 1rem;
        &_text {
           padding-left: 2rem;
        }
    }
    &_contact {
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
}
.float-card {
    width: 94vw;
    margin: 1rem auto;
    background-color: #fff;
    box-shadow: 0 0 0.3rem rgba(102, 204, 255, 0.1);
    padding: 1rem;
    box-sizing: border-box;
}
.other {
    @extend .float-card;
    p {
        padding: 0 0.5rem 0.6rem 0.5rem;
        margin-bottom: 0.6rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        span {
            font-size: smaller;
            color: $uni-text-color-grey;
        }
    }
    p:last-of-type {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
    }
    .cell-item {
        display: flex;
        justify-content: space-between;
    }
}
.logout {
    margin-top: 2rem;
    padding: 0 30vw;
}
</style>