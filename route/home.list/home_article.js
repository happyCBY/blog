//引入文章集合
const {Article} = require("../../model/article");

//引入评论集合
const {Comment} = require("../../model/comment");

//渲染文章显示页面
module.exports = async (req,res)=>{


    const { id } = req.query;
    console.log(req.session._id);

    //查询文章
    const article = await Article.findOne({_id: id}).populate("author");
    //查询评论
    const comment = await Comment.find({aid: id}).populate("uid").populate("aid");

    res.render("home/article",{
        article: article,
        comment: comment,
        uid: req.session._id
    });
};