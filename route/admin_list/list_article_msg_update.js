//获得article集合
const { Article, validateArticle } = require("../../model/article");

//引入formidable模块
const formidable = require("formidable");

//引入path模块
const path = require("path");

//引入fs模块
const fs = require("fs");

//修改页面
module.exports = (req, res, next) => {
    //创建文件解析对象
    const form = formidable.IncomingForm();
    //文件上传路径
    form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
    //保留文件的后缀名
    form.keepExtensions = "true";
    //解析表单
    form.parse(req, async (err, fields, files) => {
        console.log(files);

        let msg;
        try {

            if (files.cover.size == 0) {
                msg = {
                    title: fields.title,
                    author: fields.author,
                    publishDate: fields.publishDate,
                    content: fields.content,
                    cover: fields.cover
                }
            } else {
                msg = {
                    title: fields.title,
                    author: fields.author,
                    publishDate: fields.publishDate,
                    content: fields.content,
                    cover: files.cover.path.split("public")[1]
                }
            }

            await validateArticle(msg);
        } catch (error) {
            //验证失败
            const tostring = {
                id: fields._id,
                message: error.message,
                path: "/admin/article-edit"
            }

            return next(JSON.stringify(tostring));
        }
        if (files.cover.size != 0) {
            //查找修改的字段的图片地址
            const img_path = await Article.findOne({ _id: fields._id });
            //删除项目中对应的图片
            fs.unlink(path.join(__dirname, "../", "../", "public", img_path.cover), (err, result) => {
                if (err != null) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
        }else {

            //删除项目生成的图片
            fs.unlink(files.cover.path, (err, result) => {
                if (err != null) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
        }

        //修改信息
        await Article.updateOne({ _id: fields._id },msg);
        //重定向到文章列表页面
        res.redirect("/admin/article");
    })
}