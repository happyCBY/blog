//引入express框架
const express = require("express");



//创建路由模块
const admin = express.Router();

//引入User集合
const {User} = require("../model/user");


/**
 * get请求
 */

//渲染登录页面
admin.get("/login", require("./admin_list/list_loginPage"));

//渲染新增用户页面
admin.get("/user-edit",require("./admin_list/list_user-edit"));

//渲染文章列表页
admin.get("/article",require("./admin_list/list_article"));

//渲染文章添加页面
admin.get("/article-edit",require("./admin_list/list_article-edit"));

//渲染用户列表页
admin.get("/user",require("./admin_list/list_user"));

//实现退出登录
admin.get("/logout",require("./admin_list/list_logout"));

//实现删除用户
admin.get("/delete",require("./admin_list/list_user_delete"));

//实现删除文章功能
admin.get("/article_delete",require("./admin_list/list_article_delete"));

//跳转修改密码页面
admin.get("/moduifyPass",require("./admin_list/list_moduifyPass"));
/**
 * post请求
 */

//实现登录功能
admin.post("/login",require("./admin_list/list_login"));

//实现新增用户功能
admin.post("/register",require("./admin_list/list_register"));

//实现修改用户功能
admin.post("/update",require("./admin_list/list_user_msg_update"));

//实现文章添加功能
admin.post("/article-add",require("./admin_list/list_article-add"));

//实现修改文章功能
admin.post("/article_msg_update",require("./admin_list/list_article_msg_update"));

//实现密码修改
admin.post("/updatePass",require("./admin_list/list_updatePass"));
//导出home模块
module.exports = admin;