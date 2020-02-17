import axios from 'axios';
import API from 'api/api.config';

// 初始化数据
let state = {
    // 轮播图
    sliderImg: []
};

// 对外映射数据
let getters = {
    // 返回轮播数据
    sliderImg: state => state.sliderImg
};

// 改变数据
let mutations = {
    addSlider(state, _d) {
        state.sliderImg = _d;
    }
};

// 对外映射方法
let actions = {
    getSlider({commit}) {
        axios.get(API.getSlider_data, {
            // 超时
            timeout: 6000
        }).then(_d => {
            commit('addSlider', _d.data);
        }).catch(err => {
            console.log(err);
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
