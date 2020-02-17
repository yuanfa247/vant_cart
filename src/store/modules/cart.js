
// 初始化数据
const state = {
    cartData: []
};

// 对外映射数据
const getters = {
    // 返回购物车数据
    getCartData: state => state.cartData
};

// 变化
const mutations = {
    // 改变购物车数据
    changeCart(state, _d) {
        state.cartData = _d;
        // 同步修改localStorage值
        _d = JSON.stringify(_d);
        localStorage.setItem('cartData', _d);
    }
};

// 映射事件
const actions = {
    // 改变购物车数据
    changeCartData({commit}, arr) {
        commit('changeCart', arr);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
;
