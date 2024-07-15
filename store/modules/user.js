import { cacheKeyPre } from '@/configs.js'

export default {
  state: {
    token: uni.getStorageSync(cacheKeyPre + '-token') || '',
    roles: [],
    info: {},
    remenber: uni.getStorageSync(cacheKeyPre + '-remenberme') || {}
  },
  getters: {
    uinfo: state => state.info,
    token: state => state.token,
    roles: state => state.roles
  },
  mutations: {
    SET_STATE: (state, { key, value }) => {
      state[key] = value
      if (key === 'token') {
        if (value) {
          uni.setStorageSync(cacheKeyPre + '-token', value)
        } else {
          uni.removeStorageSync(cacheKeyPre + '-token')
        }
      }
    },
    REMENBER_ME: (state, { username, password }) => {
      if (username && password) {
        uni.setStorageSync(cacheKeyPre + '-remenberme', { username, password })
      } else {
        uni.removeStorageSync(cacheKeyPre + '-remenberme')
      }
    }
  },
  actions: {
    Login({ commit }, data) {
      if (data.experience) return commit('SET_STATE', { key: 'info', value: data.info }) // 体验
      return new Promise((resolve, reject) => {
        uni.$u.api.login(data)
          .then(res => {
            commit('REMENBER_ME', data)
            commit('SET_STATE', { key: 'token', value: res.token})
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        if (!uni.getStorageSync(cacheKeyPre + '-token')) {
          commit('SET_STATE', { key: 'token' })
          return resolve({ msg: '已退出' })
        }
        uni.$u.api.logout()
          .then(res => {
            commit('SET_STATE', { key: 'token' })
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        uni.$u.api.getUserInfo()
          .then(res => {
            commit('SET_STATE', { key: 'info', value: res.user })
            commit('SET_STATE', { key: 'roles', value: res.roles })
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
