import axios from 'axios'
import qs from 'qs'

export const IP = 'http://192.168.0.106:80/'

/* 猜你喜欢接口对接 */
export function guessLickApi() {
    return axios.get(IP + 'gethouselist.php')
}

/* 登录接口对接 */
export function loginApi(acc, pwd) {
    return axios.post(IP + 'login.php', qs.stringify(
        { acc, pwd }
    ))
}

/* 注册接口对接 */
export function regApi(acc, pwd) {
    return axios.post(IP + 'reg.php', qs.stringify(
        { acc, pwd }
    ))
}

/* 验证码接口对接 */
export function valitecodeApi() {
    return axios.get(IP + 'valitecode.php')
}
