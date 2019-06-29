//导入文章集合
const { Article } = require("../../model/article");
//导入分页模块
const pagination = require("mongoose-sex-page");


//渲染首页
module.exports = async (req,res)=>{
    const page = req.query.page||1;
    //查询数据
    const result = await pagination(Article).find().page(page).size(4).display(3).populate("User").exec();

    res.render("home/default",{
        result: result
    })
};