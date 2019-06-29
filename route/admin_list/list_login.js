//引入密码加密bcrypt模块
const bcrypt = require("bcrypt");

//引入User集合
const {User} = require("../../model/user");

//登录功能
module.exports = async (req,res)=>{
    //获得传入的参数
    let {password,email} = req.body;
    //判断传入的邮箱和密码是否为空
    if(email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("admin/error",{msg: "邮箱和密码不能为空"});
    }
    //在数据库中查找这个用户
    let user = await User.findOne({email:req.body.email});
    //判断是否存在这个用户
    if(user) {
        //用户存在
        //判断密码时否匹配
        const ifBen = await bcrypt.compare(password,user.password);

        if(!ifBen) {
            //登录失败
            return res.status(400).render("admin/error",{msg: "用户或密码填写错误"});
        }else {
            //登录成功
            req.session.user = user;
            //将username数据存储在session中
            req.session.username = user.username;
            //将用户角色存储在session中
            req.session.role = user.role;
            //将已经登录的账号放在公共的地方
            req.app.locals.userInfo = user;
            //将用户的id存在session中
            req.session._id = user._id;

            //判断用户是超级管理员还是普通用户，如果是超级管理员跳转到后台，如果是普通用户则跳转到文章界面
            if(user.role=="admin") {
                //超级管理员
                res.redirect("/admin/user");
            }else {
                //普通用户
                res.redirect("/home/index");
            }


        }
    }else {
        //用户不存在
        return res.status(400).render("admin/error",{msg: "用户或密码填写错误"});
    }
};