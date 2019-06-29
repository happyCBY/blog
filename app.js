//引入express框架
const express = require("express");

//创建服务器对象
const app = express();

//引入body-parser模块
const bodyparser = require("body-parser");

//引入session模块
const session = require("express-session");

//处理路径
const path = require("path");

//引入路由模块
const home = require("./route/home");

const admin = require("./route/admin");

//引入数据库连接模块
require("./model/connect");

//引入art-template模块
const template = require("art-template");

//引入dateformat模块
const dateformat = require("dateformat");

//引入打印请求信息模块 morgan
const morgan = require("morgan");

//引入config配置文件系统模块
const config = require("config");

console.log(config.get("title"));

//判断当前环境是开发环境还是生产环境
if(process.env.NODE_ENV=="development") {

    //当前是开发环境
    //在控制台中打印请求信息
    // app.use(morgan("dev"));
}else {
    //当前是生产环境
}

//创建模板引擎的变量dateformat
template.defaults.imports.dateformat = dateformat;

//配置模板
//模板路径
app.set("views",path.join(__dirname,"views"));
//默认模板后缀
app.set("view engine","art");
//当渲染后缀为art的模板时用什么模板引擎渲染
app.engine("art",require("express-art-template"));

//配置session  saveUninitialized: false配置代表当用户没有登录的时候访问服务器不要给用户存一个cookie
app.use(session(config.get("session")));

//处理post传入参数，并赋值给req.body
app.use(bodyparser.urlencoded({extended: false}));


//请求事件
//静态资源开放
app.use(express.static(path.join(__dirname,"public")));

//登录拦截
app.use("/admin",require("./middleware/loginGuard"));

app.use("/home",home);
app.use("/admin",admin);

//用户错误处理
// app.use((err,req,res,next) => {

//     //将错误信息转成对象形式
//     let obj = JSON.parse(err);

//     let arr = [];
//     //将传入的参数除去path存入数组中
//     for(attr in obj) {
//         if(attr!="path") {
//             obj[attr] = attr+"="+obj[attr];
//             arr.push(obj[attr]);
//         }
//     }
//     //重定向页面，并用数组的join方法拼接数组中的元素作为参数
//     res.redirect(`${obj.path}?${arr.join("&")}`);
// });

//监听端口
app.listen(3000);
console.log("服务器启动成功");
