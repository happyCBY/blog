//添加评论集合
const { Comment } = require("../../model/comment");

//评论
module.exports = async (req, res) => {
    //获得传入的参数
    const { uid, aid, content } = req.body;
    console.log(uid);

    //判断用户是否是登录状态
    if (uid) {
        //获得当前时间
        var myDate = new Date();

        //添加集合字段
        await Comment.create({
            uid: uid,
            aid: aid,
            //获得当前时间
            time: myDate.toLocaleString(),
            content: content
        });
        //重定向到article页面
        res.redirect("/home/article?id=" + aid);
    }else {
        //用户不是登录状态，跳转到登录界面
        res.redirect("/admin/login");
    }


}