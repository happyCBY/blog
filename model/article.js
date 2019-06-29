//导入mongoose模块
const mongoose = require("mongoose");

//导入joi模块
const Joi = require("joi");

//创建集合规则
const arcticleRole = mongoose.Schema({
    //文章标题
    title: {
        type: String,
        required: [true,"请输入文章标题"],
        maxlength:20,
        minlength:4
    },
    //文章作者
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"请输入文章作者"]
    },
    //发布日期
    publishDate: {
        type: Date,
        default: Date.now
    },
    //文章封面
    cover: {
        type: String,
        default: null
    },
    //文章内容
    content: {
        type: String
    }
});

//创建集合规则
const Article = mongoose.model("Article",arcticleRole);

//创建验证规则
const validateArticle = user=> {
    const schema = {
        title: Joi.string().required().min(4).max(20).error(new Error("标题格式错误")),
        author: Joi.string().required().error(new Error("用户填写错误")),
        publishDate: Joi.string(),
        cover: Joi.string(),
        content: Joi.string()
    }
    return Joi.validate(user,schema);
}
//导出
module.exports = {
    Article,
    validateArticle
}
