//登录拦截
module.exports = (req,res,next)=>{
    //判断用户是否访问的是/login页面
    //判断用户是否为登录状态
    //判断用户是否为超级管理员

    if(req.url != "/login"&&!req.session.username) {
        //用户非登录状态，重定向到登录界面
        res.redirect("/admin/login");
    }else {
         //用户为登录状态，则判断登录的用户是否为管理员，如果为管理员则跳转到用户列表界面，如果是非管理员则跳转到登录界面
        if(req.session.role=="normal")  {
            res.redirect("/home/index");
        }else {
            next();
        }



    }
}
