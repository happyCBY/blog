//引入文章集合
const {Article} = require("../..//model/article");


//渲染文章添加页面
module.exports = async (req,res)=>{
    //连接选中状态
    req.app.locals.currentLink = "article";
    //获得传入的id，如果存在则代表是请求修改文章页面，不存在则是请求添加文章界面
    const {id,message}= req.query;

    if(id) {
        //查询文章
        const article = await Article.findOne({_id: id}).populate("author");
        //渲染修改文章界面
        res.render("admin/article-edit",{
            article: article,
            button: "修改",
            href: "/admin/article_msg_update",
            message: message
        })
    }else {
        //渲染添加文章界面
        res.render("admin/article-edit",{
            button: "添加",
            href: "/admin/article-add",
            message: message
        })
    }
}