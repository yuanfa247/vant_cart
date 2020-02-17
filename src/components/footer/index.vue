<template>
    <van-tabbar
        route
        active-color="#f5540c"
        >
        <van-tabbar-item
            to="/" replace
            :icon="homeIcon ? 'wap-home' : 'wap-home-o'"
            >首页</van-tabbar-item>
        <van-tabbar-item
            to="/classify" replace
            icon="apps-o"
            >分类</van-tabbar-item>
        <van-tabbar-item
            to="/cart" replace
            :icon="cart ? 'shopping-cart' : 'shopping-cart-o'"
            >购物车</van-tabbar-item>
        <van-tabbar-item
            to="/my" replace
            :icon="meIcon ? 'manager' : 'manager-o'">
            {{getMyText}}
        </van-tabbar-item>
        <van-tabbar-item
            to="/admin" replace
            v-if="isAdmin"
            name="setting" icon="setting-o">录入</van-tabbar-item>
    </van-tabbar>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'gfooter',
    data() {
        return {
            active: 0,
            homeIcon: false,
            classify: false,
            cart: false,
            meIcon: false
        };
    },
    // 计算对象
    computed: {
        getMyText() {
            // 如果是登陆状态
            if (this.getLogin) {
                return '我的';
            } else {
                return '未登录';
            }
        },
        // 判断是否为管理员
        isAdmin() {
            // 如果是登陆状态
            if (this.getLogin) {
                // 如果id和管理员匹配，给予添加权限
                if (this.loginInfos._id === this.getAdminId) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapGetters(['getLogin', 'loginInfos', 'getAdminId'])
    },
    // 监听对象
    watch: {
        // 监听活动状态 (路由模式不生效)
        active(val) {
            // 先重置
            this.homeIcon = false;
            this.cart = false;
            this.meIcon = false;
            if (val === 0) {
                this.homeIcon = true;
            } else if (val === 2) {
                this.cart = true;
            } else if (val === 3) {
                this.meIcon = true;
            }
        }
    },
    // 属性对象
    props: {
        // myText: {
        //     type: String,
        //     default: '我的'
        // }
    },
    // 方法对象
    methods: {
        // 路由改变的时候
        // routerChange(val) {
        //     // this.isLogin();
        // }
        // isLogin() {
        //     // 判断是否有用户名
        //     if (localStorage.username) {
        //         this.myText = '我的';
        //     } else {
        //         this.myText = '未登录';
        //     }
        // }
    },
    // 创建后
    created() {
        // console.log(this.loginInfos);

        // this.isLogin();
    }
};
</script>
