//引入mongoose第三方模块
const mongoose = require("mongoose");

//引入密码加密bcrypt模块
const bcrypt = require("bcrypt");

//创建集合规则
const userRole = mongoose.Schema({
    //用户名
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 12
    },
    //邮箱
    email: {
        type: String,
        required: true,
        //不允许数据库有重复值
        unique: true
    },
    //密码
    password: {
        type: String,
        required: true,
    },
    //角色
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },
    //状态 默认为0 启用状态
    state: {
        type: Number,
        default: 0
    }
});

//引入joi表单验证模块
const Joi = require("joi");

//创建User集合
const User = mongoose.model("User", userRole);

//创建密码加密函数
async function run() {
    //获得加密字符串
    let str = await bcrypt.genSalt(10);
    //加密字符串
    let result = await bcrypt.hash("123456", str);
    //创建超级管理员
    User.create({
        username: "超级管理员",
        email: "1765094230@qq.com",
        password: result,
        role: "admin",
        state: 0
    }).then(() => { console.log("创建成功") }).catch(() => { console.log("创建失败") });
}
// run();

//创建注册表单验证函数
const validateUser = user=>{
    //定义验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error("用户名格式错误")),
        email: Joi.string().email().error(new Error("邮箱格式错误")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required().error(new Error("密码填写错误")),
        role: Joi.string().valid("normal","admin").required().error(new Error("用户角色填写错误")),
        state: Joi.number().valid(0,1).required().error(new Error("用户状态填写错误"))
    }
    //验证表单
    return Joi.validate(user,schema);
}

//导出User集合
module.exports = {
    //es6中当键和值都一样的时候可以简写成一个，下面等同于User:User
    User,
    validateUser
};