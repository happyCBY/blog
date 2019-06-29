//导入bcrypt
const bcrypt = require("bcrypt");

//导加密密码方法
const bcrypts = require("../common/bcrypt");

//导入用户集合
const {User,validateUser} = require("../../model/user");

//导入joi表单验证模块
const Joi = require("joi");

//实现新增用户功能
module.exports = async (req, res,next) => {

    try {
        //验证表单
        await validateUser(req.body);

    }catch(error){

        //验证错误
        const tostring = JSON.stringify({
            path: "/admin/user-edit",
            message: error.message
        });
        return next(tostring);
    }
    //判断邮箱是否已被注册
    if(await User.findOne({email: req.body.email})) {
        const tostring = JSON.stringify({
            path: "/admin/user-edit",
            message: "邮箱已被注册"
        });
        return next(tostring);
    }
    //验证通过，加密密码
    req.body.password = await bcrypts.runBcrypt(req.body.password);

    //将数据存入数据库
    await User.create(req.body);

    //重定向页面
    res.redirect("/admin/user");

    // let message = await User.create(req.body);
    // console.log(message);

};