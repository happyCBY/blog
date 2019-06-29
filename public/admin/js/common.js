//将 serializeArray()方法返回得数组转换为对象类型存储
function arrChangeJson(doc) {
    var result = {};
    //获得表单提交数据 用一个数组存储 数组存储格式为:
    // 假如有两个表单项提交 第一个表单项: name=email value=zs  第二个表单项: name=password value = 12
    //则该方法得到得数组为
    //[{name:email,value:zs},{name:password,value:12}]
    doc.serializeArray().forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
}