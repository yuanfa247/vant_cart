const PORT = '5489';
// 本地地址
const BASE_URL = 'http://localhost:' + PORT;

const API_LIST = {
    // 查询条件
    api_accept: BASE_URL + '/api_accept',
    // 查询结果
    api_send: BASE_URL + '/api_send',
    // 提交注册
    regist_post: BASE_URL + '/api_regist',
    // 提交登陆
    login_post: BASE_URL + '/api_login',
    // 提交商品
    commit_goods: BASE_URL + '/add_product',
    // 获得所有商品及其分类
    getALL_goods: BASE_URL + '/all_product',
    // 获得单个商品信息
    getGoods_infos: BASE_URL + '/one_product',
    // 获得集合对应的数据
    getGoods_sets: BASE_URL + '/sets_product',
    // 获得分页对应数据
    getPages_data: BASE_URL + '/pages_product',
    // 获得轮播图
    getSlider_data: BASE_URL + '/slider',
    // 获得图标
    getIcon_data: BASE_URL + '/icon'
};

module.exports = API_LIST;
