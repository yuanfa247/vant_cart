import Vue from 'vue';
import App from './App';
import router from './router';
import 'assets/sass/index.scss';
import 'assets/js/rem.js';
import store from './store';
import axios from 'axios';
import {
    Button, NavBar, Field, Dialog, Card,
    Notify, Icon, Tabbar, TabbarItem, Tab, Tabs,
    Grid, GridItem, Image, Cell, CellGroup, Sticky,
    GoodsAction, GoodsActionIcon, GoodsActionButton,
    Sku, Toast, SubmitBar, Checkbox, Stepper, CheckboxGroup,
    Sidebar, SidebarItem, Search, Lazyload, Pagination,
    Swipe, SwipeItem, Picker, Popup
} from 'vant';

// axios
Vue.prototype.$axios = axios;
// vant
Vue.use(Button).use(NavBar).use(Field).use(Checkbox).use(CheckboxGroup)
    .use(Dialog).use(Notify).use(SubmitBar).use(Sidebar).use(SidebarItem)
    .use(Icon).use(Tabbar).use(TabbarItem).use(Search)
    .use(Tab).use(Tabs).use(Grid).use(GridItem).use(Sticky).use(Picker).use(Popup)
    .use(Image).use(Cell).use(CellGroup).use(Stepper).use(Swipe).use(SwipeItem)
    .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
    .use(Sku).use(Toast).use(Card).use(Pagination).use(Pagination);

// 懒加载
Vue.use(Lazyload, {
    lazyComponent: true,
    // loading: require('assets/img/loading.gif'), // 懒加载的图片
    preload: '1', // 预加载高度的比例
    error: require('assets/img/error.png')
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
