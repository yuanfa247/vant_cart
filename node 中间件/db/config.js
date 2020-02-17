// 数据库地址
exports.DB_CONN_STR = 'mongodb://127.0.0.1:27017/';

// 数据库名
exports.DB_NAME = 'vant_cart';
// 用户集合名
exports.USER_DB_CONLLECT = 'userInfos';
// 产品数据集合
exports.PRODUCT_DB_CONLLECT = 'productSort';

// 登录状态
exports.CODE = {
    // 注册码
    reg_code1: 1,// 注册成功
    reg_code2: 2,// 用户名已存在
    reg_code3: 3,// 连接数据库失败
    // 登录码
    login_code1: 4, // 登录成功
    login_code2: 5, // 用户名不存在
    login_code3: 6, // 密码错误
    // 产品码
    goods_code1: 7, // 添加商品成功
    goods_code2: 8 // 添加商品失败
}
