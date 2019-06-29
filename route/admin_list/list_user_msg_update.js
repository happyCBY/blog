//引入User集合
const {User} = require("../../model/user");

//引入bcrypt模块
const bcrypt = require("bcrypt");

module.exports = async(req,res,next)=>{

    //查询要修改的字段
    const user = await User.findOne({_id: req.body._id});
    //判断输入的密码是否和修改字段的密码一致

    if(await bcrypt.compare(req.body.password,user.password)){
        //将密码换成加密密码
        req.body.password = user.password;
        //密码相等，修改资料
        await User.updateOne({_id: req.body._id},req.body);

        //重定向到列表页
        res.redirect("/admin/user");
    }else {
        //密码不相等
        const str = {
            message: "密码比对失败，不能修改信息",
            path: "/admin/user-edit",
            id: req.body._id
        };
        next(JSON.stringify(str));

    }
};