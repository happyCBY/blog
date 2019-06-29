//引入article集合
const {Article} = require("../../model/article");

//引入mongoose-sex-page分页模块
const pagination = require("mongoose-sex-page");

//渲染文章列表页面
module.exports = async (req,res)=>{


    //连接选中状态
    req.app.locals.currentLink = "article";
    //获得当前页
    const page = req.query.page||1;

    //获得分页模块返回的对象
    const article = await pagination(Article).find().page(page).size(2).display(3).populate("author").exec();

    res.render("admin/article",{
        article: article
    });
}