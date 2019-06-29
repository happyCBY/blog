//引入mongoose模块
const mongoose = require("mongoose");

//创建评论集合规则
const commentRole = mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});
//创建评论集合
const Comment = mongoose.model("Comment",commentRole);

// //创建评论
// Comment.create({
//     uid: "5d07847133c6de0e14a26e32",
//     aid: "5d09af627948b623480b0670",
//     content: "哈哈"

// });

//导出
module.exports = {
    Comment
}