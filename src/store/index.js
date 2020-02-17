import Vue from 'vue';
import Vuex from 'vuex';
import GoodsSort from './modules/goodsSort';
import LoginState from './modules/loginState';
import Cart from './modules/cart';
import Slider from './modules/slider';
import IconSort from './modules/iconSort';

// 全局使用
Vue.use(Vuex);

// 导入store实例
export default new Vuex.Store({
    modules: { GoodsSort, LoginState, Cart, Slider, IconSort }
});
