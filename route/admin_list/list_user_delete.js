//引入User集合
const {User} = require("../../model/user");
//导出
module.exports = async (req,res)=>{
    //删除字段
    await User.deleteOne({_id: req.query.id});
    //重定向
    res.redirect("/admin/user");

};