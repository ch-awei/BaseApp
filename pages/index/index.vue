<template>
<view class="login full-screen">
    <u-toast ref="uToast" />
    <image src="/static/uniapp.png" />
    <h2>uni-app</h2>
    <view class="login_form">
        <view class="login_form_item" v-for="(item, key) in list" :key="key">
            <u-icon :name="item.icon" size="35" />
            <input
                v-model="form[key]"
                :focus="focus[key]"
                :style="{'width': key==='code' ? '36%' : '80%'}"
                :placeholder="item.txt"
                :password="item.ispwd"
            > </input>
            <image v-if="key==='code'" :src="form.img" @click="getCaptcha" />
        </view>
    </view>
    <checkbox-group @change="checkboxChange">
        <checkbox value="remenber" :checked="form.remenber">记住我</checkbox>
    </checkbox-group>
    <u-button type="primary" shape="circle" text="登 录" @click="tologin" />
    <u-button type="success" shape="circle" text="去体验" icon="arrow-right-double" @click="experience" />
    <p>xx 信息科技有限公司</p>
</view>
</template>

<script>
// 加密\解密工具, 使用前需配置公钥
import { encrypt, decrypt } from '@/libs/utils/encrypt.js'
export default {
    data() {
        return {
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
    onLoad() {
        // 加载完毕, 初始化数据, 如获取验证码、检查是否缓存记住密码
        // this.init()
    },
    methods: {
        init() {
            const username = uni.getStorageSync('uniapp-username') || ''
            const password = uni.getStorageSync('uniapp-password') || ''
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
            this.$u.api.getCode().then(res => {
                this.form = {
                    ...this.form,
                    img: res.img || '',
                    uuid: res.uuid || '',
                }
            })
        },
        checkboxChange({ detail }) { // 多选框变化
            this.form = { ...this.form, remenber: detail?.value.length ? true : false }
        },
        tologin() { // 登录
            let params = { ...this.form }
            const tips = { username: '请输入用户名', password: '请输入密码', code: '请输入验证码' }
            for (let k in tips) {
                if (!params[k]) {
                    return uni.showModal({
                        title: '提示',
                        content: tips[k],
                        complete: () => {
                            this.focus[k] = true
                            this.focus = { ...this.focus }
                        }
                    })
                }
            }
            return this.$refs.uToast.show({ type: 'warning', message: '暂未开放' })
            delete params.img
            params.password = encrypt(params.password)
            this.$u.api.login({ custom: { catch: true }, ...params }).then(res => {
                if (res?.code) {
                    this.$refs.uToast.show({ type: 'error', message: res.msg })
                    return this.getCode()
                }
                const data = params.remember ? { ...res, ...params } : { ...res }
                this.$store.commit('login', data)
                this.$refs.uToast.show({
                    type: 'success',
                    message: '登录成功',
                    duration: 1000,
                    complete() {
                        uni.switchTab({ url: '/pages/home/index' })
                    }
                })
            }).catch(err => {
                this.getCode()
                uni.showModal({
                    title: '提示',
                    content: err.data?.message || '请重试'
                })
            })
        },
        experience() { // 体验
            const nowTime = +new Date().getTime().toString()
            this.$store.commit('login', {
                user: {
                    username: nowTime,
                    nickname: '游客'.concat(nowTime),
                    phone: '18888888888',
                    email: 'email@163.com'
                }
            })
            this.$refs.uToast.show({
                type: 'success',
                message: '游客体验',
                duration: 1000,
                complete: () => {
                    uni.switchTab({ url: '/pages/home/index' })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    h2 { margin-bottom: 5vh; }
    padding-top: 5vh;
    box-sizing: border-box;
    image {
        width: 30vw;
        height: 30vw;
        margin: 5vh 0 3vh 0;
    }
    &_form {
        width: 90%;
        &_item {
            display: flex;
            padding: 0.5rem 1rem;
            input {
                height: 2rem;
                margin-left: 0.5rem;
                padding: 0.3rem 1rem;
                border-radius: 2rem;
                background-color: rgba(0, 170, 255, 0.05);
                box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
            }
            image {
                height: 2.5rem;
                width: 43%;
                margin: 0 0 0 1rem;
            }
        }
    }
    uni-checkbox-group {
        width: 90%;
        padding: 2rem 0 2rem 3rem;
    }
    .u-button {
        width: 80vw;
        margin-top: 1rem;
    }
    p {
        text-align: center;
        color: $uni-text-color-grey;
        font-size: small;
        position: fixed;
        bottom: 2rem;
    }
}
</style>
