import Cookies from 'js-cookie'

// 变量
const tokenKey = 'accountUserToken'
const usernameKey = 'accountUserName'

/* token */
// 获取token
export function getUserToken() { return Cookies.get(tokenKey) }
export function getTokencars() { return Cookies.get(tokenKey) }
// 写入token
export function setUserToken(value) { return Cookies.set(tokenKey, value) }
// 删除token
export function removeUserToken() { return Cookies.remove(tokenKey) }

/* username */
// 获取token
export function getUserName() { return Cookies.get(usernameKey) }
// 写入token
export function setUserName(value) { return Cookies.set(usernameKey, value) }
// 删除token
export function removeUserName() { return Cookies.remove(usernameKey) }

