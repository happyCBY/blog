//引入article集合
const {Article} = require("../../model/article");

//引入fs系统模块
const fs = require("fs");

//引入path系统模块
const path = require("path");

//删除文章
module.exports = async (req,res,next)=>{
    //查找并删除文章
    console.log(req.query.id);

    const del_img = await Article.findOneAndDelete({_id: req.query.id});
    console.log(del_img);

    console.log(path.join(__dirname,"../","../","public",del_img.cover));

    //删除uploads文件下的图片
    fs.unlink(path.join(__dirname,"../","../","public",del_img.cover),(err,result)=>{
        if(err!=null) {
            console.log(err);

        }else {
            console.log(result);
        }
    });
    //重定向到文章列表页
    res.redirect("/admin/article");
};