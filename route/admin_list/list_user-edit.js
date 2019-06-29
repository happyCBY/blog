//添加User集合
const {User} = require("../../model/user");


//渲染新增用户页面,或者修改界面
module.exports = async(req,res)=>{
    //连接选中状态
    req.app.locals.currentLink = "user";

    //获取传到地址栏的参数
    const {message, id} = req.query;

    if(id) {
        //id存在，修改操作
        //查询id所对应的文档
        const user = await User.findOne({_id: id});
        //渲染用户修改界面
        res.render("admin/user-edit",{
            message:message,
            user: user,
            //传入修改完成后提交的地址
            href: "/admin/update",
            //按钮名字
            button: "修改"
        });
    }else {
        //id不存在，添加操作
        res.render("admin/user-edit",{
            message: message,
            href: "/admin/register",
            button: "添加"
        });
    }




};