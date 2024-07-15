const fn = (url, data, method = 'get') => {
  if (!['get', 'post', 'put', 'delete'].includes(method)) {
    method = 'post'
  }
  const config = data?.requestConfig || {}
  return uni.$u.http[method](url, data, config)
}

export const APIuser = {
  getCaptcha: data => fn('auth/code', data),
  getUserInfo: data => fn('auth/getUserInfo', data),
  login: data => fn('auth/login', data, 'post'),
  logout: data => fn('auth/logout', data, 'post')
}

export const APIdcit = {}

export default {
  install: (Vue, vm) => {
    vm.$u.api = {
      ...APIuser,
      ...APIdcit
    }
  }
}


/**
 * api 使用方式
 * 
 * 方式1
 * this.$u.api.login(data).then(res => {}).catch(err => {})
 * 
 * 方式2
 * import { APIuser } from '@/libs/http/api.js'
 * API.login(data).then(res => {}).catch(err => {})
 * 
 */
