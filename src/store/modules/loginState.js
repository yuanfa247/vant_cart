let _login = localStorage.getItem('userinfos');

// 管理员标识_id
let _admin = '5e48138af2b8a63420f25dd3';

// 如果存在登陆信息
if (_login) {
    _login = JSON.parse(_login);
}

// 状态
let state = {
    // 登陆状态
    isLogin: Boolean(_login),
    // 用户信息
    loginInfos: _login,
    // 管理员标识对比id
    adminId: _admin

};

// 获得状态
let getters = {
    getLogin(state) {
        return state.isLogin;
    },
    loginInfos(state) {
        return state.loginInfos;
    },
    getAdminId(state) {
        return state.adminId;
    }
};

// 变化，突变
let mutations = {
    // 改变登陆状态
    changeLogin(state, isLogin) {
        state.isLogin = isLogin;
    },
    // 清空用户信息
    clearLogin(state) {
        state.loginInfos = null;
        localStorage.removeItem('userinfos');
        // 清空后，退出登陆
        state.isLogin = false;
    },
    // 改变用户信息
    changeUserInfos(state, obj) {
        state.loginInfos = obj;
        let _infos = JSON.stringify(obj);
        // 存储登录信息
        localStorage.setItem('userinfos', _infos);
    }
};

// 提交行动改变状态，
let actions = {
    // 改变状态
    changeLogin({commit}, login) {
        if (typeof login !== 'boolean') throw new Error('params must is Boolean');
        commit('changeLogin', login);
    },
    changeUserInfos({commit}, objInfos) {
        if (typeof objInfos !== 'object') throw new Error('params must is object');
        commit('changeUserInfos', objInfos);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
