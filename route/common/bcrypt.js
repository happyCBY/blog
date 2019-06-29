//引入bcypt密码加密模块
const bcrypt = require("bcrypt");



//加密字符
/**
 *
 * @param {*} enable_password 明文密码
 */
async function runBcrypt(enable_password) {
    console.log("进来了");

    //创建加密字符串
    const str = await bcrypt.genSalt(10);

    // return await bcrypt.hash("123456", str);
    return await bcrypt.hash(enable_password,str);
}

//验证加密密码
/**
 *
 * @param {*} enable_password  明文密码
 * @param {*} encrypted_password 加密密码
 */
async function check_password(enable_password, encrypted_password) {
    return await bcrypt.compare(enable_password, encrypted_password);
}
//导出加密密码方法
module.exports.runBcrypt = runBcrypt;

//导出验证加密密码方法
module.exports.check_password = check_password;