/* 校验邮箱 */
export function validate_email(value) {
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return regEmail.test(value)
}
/* 校验手机号 */
export function validate_phone(value) {
  const regPhone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
  return regPhone.test(value)
}
/* 校验密码 */
export function validate_password(value) {
  const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return regPassword.test(value)
}
