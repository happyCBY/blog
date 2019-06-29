const {User} = require("../../model/user");
const bcrypt = require("bcrypt");

const runbcrypt = require("../common/bcrypt");

module.exports = async(req,res)=>{
    let {originPass,newPass,comfimPass} = req.body;
    if(bcrypt.compare(originPass,req.session.user.password)) {
        if(newPass==comfimPass) {

            //加密密码
            newPass = await runbcrypt.runBcrypt(newPass);
            //修改密码
            await User.findOneAndUpdate({_id:req.session.user._id},{password: newPass});
            //重定向页面
            res.redirect("/admin/logout");
        }else {
            console.log(2);
            res.render("admin/moudifyPass");
        }
    }else {
        console.log(1);

        res.render("admin/moudifyPass");
    }

}