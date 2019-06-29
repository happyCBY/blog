//引入express框架
const express = require("express");

//创建路由模块
const home = express.Router();

//渲染文章详情页面
home.get("/article",require("./home.list/home_article"));

//渲染首页
home.get("/index",require("./home.list/index"));

//评论功能实现
home.post("/comment",require("./home.list/home_comment"));


//导出home模块
module.exports = home;