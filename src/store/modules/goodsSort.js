import API_LIST from 'api/api.config';
import axios from 'axios';

// 状态
let state = {
    // 商品分类
    goodsSort: [],
    // 获得产品详情信息
    product: {},
    // 集合中产品列表
    productList: [],
    // 分页中指定产品
    pageProduct: []
};

let getters = {
    // 获得所有商品分类
    getGoodsSort(state) {
        return state.goodsSort;
    },
    // 获得单个商品
    productInfo() {
        return state.product;
    },
    // 获得产品列表
    productList(state) {
        return state.productList;
    },
    // 分页中指定产品
    pageProduct(state) {
        return state.pageProduct;
    }
};

// 变化
let mutations = {
    // 添加商品分类
    addGoodsSort(state, data) {
        state.goodsSort = data;
    },
    // 改变商品信息
    changeInfos(state, data) {
        // 留存一份，方便修改
        state.product = {
            _id: data._id,
            picSrc: data.picSrc,
            title: data.title,
            delPrice: data.delPrice,
            price: data.price,
            sold: data.sold,
            token: data.token
        };
    },
    // 改变集合中商品列表
    changeSets(state, data) {
        state.productList = data;
    },
    // 改变一页中的数据
    changePage(state, data) {
        state.pageProduct = data;
    }
};

// 行动
let actions = {
    // 获得所有商品分类和信息
    getAllSort({commit}) {
        return axios.get(API_LIST.getALL_goods)
            .then(_d => {
                commit('addGoodsSort', _d.data);
                return _d.data;
            }).catch(err => {
                console.log(err);
        });
    },
    // 获得指定产品信息
    getProduct({commit}, obj) {
        if (!obj) throw new Error('必须传入参数');
        return axios.get(API_LIST.getGoods_infos, { params: obj })
            .then(_d => {
                commit('changeInfos', _d.data);
            }).catch(err => {
                console.log(err);
        });
    },
    // 获得集合中对应的产品
    getSetsProduct({commit}, sets) {
        if (typeof sets !== 'object') throw new Error('参数必须是object');
        // 请求数据
        axios.get(API_LIST.getGoods_sets, {
            params: sets
        }).then(_d => {
            commit('changeSets', _d.data);
        }).catch(err => {
            console.log(err);
        });
    },
    // 获得指定页中的数据
    getPagesProduct({commit}, obj) {
        // 请求获得数据
        axios.get(API_LIST.getPages_data, {
            params: obj,
            timeout: 10000
        }).then(_d => {
            // 提交变化
            commit('changePage', _d.data);
        }).catch(err => {
            console.log(err);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
