<template>
    <div class="personal">
        <!-- 头部 -->
        <header class="header">
            <!-- 小图标 -->
            <div class="head_icon">
                <img :src="getHeadImg" >
            </div>
            <div class="head_userName">用户：{{loginInfos.username}}</div>
        </header>
        <!-- 内容 -->
        <div class="content">
            <ul class="items">
                <li class="items_list">
                    <img class="items_pic" src="./img/address.png" alt="收货地址管理" >
                    <span class="items_text">收货地址管理</span>
                    <span class="arrow">&gt;</span>
                </li>
                <li class="items_list">
                    <img class="items_pic" src="./img/money.png" alt="商家代金券" >
                    <span class="items_text">商家代金券</span>
                    <span class="arrow">&gt;</span>
                </li>
            </ul>
            <ul class="items">
                <li class="items_list">
                    <img class="items_pic" src="./img/email.png" alt="意见反馈" >
                    <span class="items_text">意见反馈</span>
                    <span class="arrow">&gt;</span>
                </li>
                <li class="items_list">
                    <img class="items_pic" src="./img/question.png" alt="常见问题" >
                    <span class="items_text">常见问题</span>
                    <span class="arrow">&gt;</span>
                </li>
            </ul>
            <ul class="items exitLogin"
                @click="exitLogin">
                <li class="items_list">
                    <span class="items_text">退出登陆</span>
                </li>
            </ul>
            <!-- 服务电话 -->
            <p class="serve_tel">客服电话:&nbsp;101-097-77</p>
            <!-- 服务时间 -->
            <p class="serve_time">服务时间:&nbsp;9:00-23:00</p>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { mapActions, mapGetters } from 'vuex';
import headImg from './img/head.jpg';

export default {
    name: 'my_page',
    computed: {
        // 头像
        getHeadImg() {
            // 如果用户信息有图片
            if (this.loginInfos.imgSrc) {
                return this.loginInfos.imgSrc;
            } else {
                // 没有就使用默认图片
                return headImg;
            }
        },
        ...mapGetters(['loginInfos'])
    },
    // 方法对象
    methods: {
        // 退出登陆
        exitLogin() {
            localStorage.removeItem('userinfos');
            localStorage.removeItem('isHint');

            // 表示退出登陆
            this.changeLogin(false);
            this.$router.push('/');
            this.$notify('你已经退出登陆');
        },
        // 计算对象
        ...mapActions(['changeLogin'])
    },
    // 进入路由之前
    beforeRouteEnter(to, from, next) {
        // 如果存在用户信息
        if (localStorage.userinfos) {
            next();
        } else {
            // 前往登录界面
            next('/login');
            Toast({
                message: '您还未登录'
            });
        }
    },
    // 创建后
    created() {
    }

};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
@import './index';
// 退出登陆
.exitLogin{
    text-align: center;
    padding-left: 0!important;
    .items_text{
        display: block;
        width: 100%;
        &:active{
            color: #979797;
        }
    }
    &:active{
        background-color: #f8f8f8;
    }

}
</style>
