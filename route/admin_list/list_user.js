//引入User集合
const {User} = require("../../model/user");

//渲染用户列表页面,将数据库的数据渲染到列表页
module.exports = async (req,res)=>{
    //连接选中状态
    req.app.locals.currentLink = "user";
    //获取当前页数
    let page = req.query.page||1;
    //设置每页显示多少条数据
    let pagesize = 2;
    //获得数据总量
    let count = await User.countDocuments({});
    //获得分页数量，向上取整
    let pageNum = Math.ceil(count/pagesize);
    //查找所有用户信息
    let users = await User.find({}).skip((page-1)*pagesize).limit(pagesize);

    //渲染user页面
    res.render("admin/user",{
        users: users,
        pageNum: pageNum,
        page: page,
        count:count
    });
};