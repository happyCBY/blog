//引入formidable模块
const formidable = require("formidable");

//引入path模块
const path = require("path");

//引入article集合
const {Article,validateArticle} = require("../../model/article");


//文章添加
module.exports = async(req,res,next) => {

    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传地址
    form.uploadDir = path.join(__dirname,"../","../","public","uploads");

    //保留上传文件后缀名
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async (err,fields,files)=>{
        //验证提交的信息
        try {
            await validateArticle(fields)
        }catch(error){
            //验证错误
            const tostring = JSON.stringify({
                path: "/admin/article-edit",
                message: error.message
            });
            return next(tostring);
        }
        //向article集合中添加字段
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            //将上传文件的地址切割，获得图片在服务器端的访问地址
            cover: files.cover.path.split("public")[1],
            content: fields.content
        });
        //重定向到文章列表页面
        res.redirect("/admin/article");
    });
    // console.log(form);

}