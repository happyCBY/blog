//退出登录
module.exports = (req,res)=>{
    //删除session
    req.session.destroy(function(){
        //将全局模板信息
        res.locals.userInfo = null;
        //删除cookie
        res.clearCookie("connect.sid");
        //重定向到登录页
        res.redirect("/admin/login");
    });
}