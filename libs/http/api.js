const apis = {
    'get': {
        'getCode': 'auth/code',
        'getUserinfo': 'auth/getUserinfo'
    },
    'post': {
        'login': 'auth/login'
    }
}
const fns = {
    'get': url => data => uni.$u.http.get(url, data),
    'post': url => (params, config = {}) => uni.$u.http.post(url, params, config)
}

let install = (Vue, vm) => {
    let uniApis = {}
    for (let way in apis) for (let k in apis[way]) {
        uniApis[k] = fns[way](apis[way][k])
    }
    vm.$u.api = { ...uniApis }
}

export default { install }