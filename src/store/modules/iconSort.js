import Axios from 'axios';
import API from 'api/api.config';

// 状态
let state = {
    // 首页图标数据
    iconData: []
};

// 获得状态
let getters = {
    // 获得图标数据
    iconData: state => state.iconData
};

// 变化，改变状态
let mutations = {
    // 初始化图标数据
    initIcondata(state, _d) {
        // 改变图标数据
        state.iconData = _d;
    }
};

// 行动，提交变化
let actions = {
    initIcon({commit}) {
        // 初始化数据
        Axios.get(API.getIcon_data, {
            timeout: 6000
        }).then(_d => {
            // 提交变化
            commit('initIcondata', _d.data);
        }).catch(err => {
            console.log(err);
        });
    }
};

// 导出
export default {
    state,
    getters,
    mutations,
    actions
};
