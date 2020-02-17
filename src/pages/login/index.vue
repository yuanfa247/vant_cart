<template>
    <div class="login_page">
        <!-- 顶栏 -->
        <v-header
            :title="msg"/>
        <!-- 登录界面 -->
        <van-cell-group>
            <van-field
                required
                v-model="username"
                placeholder="请输入用户名"
                :error-message="userError"
                clearable
            />
            <van-field
                required
                v-model="password"
                placeholder="请输入密码"
                :error-message="passwordErr"
                clearable
            />
        </van-cell-group>
        <!-- 提交按钮 -->
        <div class="btn_box">
            <van-button
                @click="loginFn"
                type="primary"
            >点击登录</van-button>
            <van-button
                @click="enterRegister"
                type="warning"
            >马上注册</van-button>
        </div>
    </div>
</template>
<script>
import API_LIST from 'api/api.config';
import vHeader from './header';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'login',
    data() {
        return {
            msg: '登录页',
            username: '',
            password: '',
            // 错误信息
            userError: '',
            passwordErr: ''

        };
    },
    components: { vHeader },
    // 计算对象
    computed: {
        ...mapGetters(['getLogin'])
    },
    methods: {
        // 进入注册页面
        enterRegister() {
            this.$router.push('/register');
        },
        // 点击登录
        loginFn() {
            // 如果校检不通过直接返回
            if (!this.checkoutInfos()) return;
            let loginObj = {
                username: this.username,
                password: this.password
            };

            // post方式提交登录
            this.$axios.post(API_LIST.login_post, loginObj, {
                timeout: 6000
            }).then(result => {
                let _d = result.data;

                // 登录成功
                if (_d.login_code === 4) {
                    // 提示信息
                    this.$dialog.alert({
                        title: '登录成功',
                        message: `用户${this.username}登录成功`
                    }).then(() => {
                        // 跳转首页
                        this.$router.push('/');
                        // 改变vuex登陆状态
                        this.changeLogin(true);
                        // 改变vuex用户信息
                        this.changeUserInfos(_d.login_info);
                    });
                    return;
                }

                // 登陆失败
                this.$dialog.alert({
                    message: _d.login_info
                });
                // 清空数据
                this.username = '';
                this.password = '';
            }).catch(() => {
                this.$notify('连接超时，请重试');
            });
        },
        // 校检信息
        checkoutInfos() {
            // 重置错误信息
            this.userError = '';
            this.passwordErr = '';

            // 校检
            if (this.username === '') {
                this.userError = '请输入用户名';
                return false;
            } else if (this.password === '') {
                this.passwordErr = '请输入密码';
                return false;
            }
            return true;
        },
        // 点击重置
        resetsFn() {
            // 清空数据
            this.username = '';
            this.password = '';
        },
        ...mapActions(['changeLogin', 'changeUserInfos'])
    },
    // 进入路由前判断
    beforeRouteEnter(to, from, next) {
        if (localStorage.userinfos) {
            next(false);
        } else {
            next();
        }
    }
};
</script>
<style lang="scss" scoped>
.btn_box{
    text-align: center;
    margin: 40px 0;
    .van-button--primary{
        margin-right: 30px;
    }
}
</style>
