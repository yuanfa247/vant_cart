<template>
    <div class="register_page">
        <v-header
            :title="msg"
            />
        <div class="options">
            <van-cell-group>
                <van-field
                    v-model.lazy.trim="username"
                    required
                    label="用户名"
                    placeholder="请输入用户名"
                    :error-message="userErr"
                    clearable
                />
                <van-field
                    v-model.lazy.trim="password"
                    type="password"
                    required
                    placeholder="请输入密码"
                    :error-message="passwordErr"
                    label="密码"
                    clearable
                />
                <van-field
                    v-model.lazy.trim="password2"
                    type="password"
                    required
                    placeholder="请再次输入密码"
                    :error-message="passwordErr2"
                    label="重复密码"
                    clearable
                />
                <van-field
                    v-model.lazy.trim="describe"
                    label="个人签名"
                    placeholder="请输入个人签名"
                    clearable
                />
            </van-cell-group>
        </div>
        <div class="btn_box">
            <van-button
                @click="commitRegist"
                type="info"
            >立即注册</van-button>
            <van-button
                @click="registReset"
                type="danger"
            >重置</van-button>
        </div>
    </div>
</template>
<script>
import API_LIST from 'api/api.config';
import vHeader from './header';

export default {
    name: 'register',
    // 选项数据
    data() {
        return {
            msg: '注册页',
            // 用户信息
            username: '',
            password: '',
            password2: '',
            describe: '', // 用户签名
            // 错误提示
            userErr: '',
            passwordErr: '',
            passwordErr2: ''
        };
    },
    // 组件
    components: { vHeader },
    // 方法对象
    methods: {
        // 提交注册
        commitRegist() {
            // 如果校检未通过，直接返回
            if (!this.checkoutInfo()) return;

            // 提交注册信息
            let registData = {
                username: this.username,
                password: this.password,
                describe: this.describe
            };

            // 提交请求
            this.$axios.post(API_LIST.regist_post, registData).then(_d => {
                // 注册失败
                if (_d.data.reg_code === 1) {
                    // 注册成功
                    this.$dialog.alert({
                        message: _d.data.reg_info
                    }).then(() => {
                        // 回到首页
                        this.$router.push('/login');
                    });
                } else {
                    this.$dialog.alert({
                        title: '注册失败',
                        message: _d.data.reg_info
                    }).then(() => {
                        // 重置密码用户名
                        this.username = '';
                        this.password = '';
                        this.password2 = '';
                    });
                }
            });
        },
        // 重置信息
        registReset() {
            this.username = '';
            this.password = '';
            this.password2 = '';
            this.describe = '';
        },
        // 校检注册信息
        checkoutInfo() {
            // 开头重置错误信息
            this.userErr = '';
            this.passwordErr = '';
            this.passwordErr2 = '';
            // 用户名为空
            if (!this.username) {
                this.userErr = '请输入用户名';
                return false;
            } else if (!this.password) { // 密码为空
                this.passwordErr = '密码不能为空';
                return false;
            } else if (!this.password2) { // 重复密码为空
                this.passwordErr2 = '重复密码不能为空';
                return false;
            } else if (this.password !== this.password2) {
                this.passwordErr2 = '两次密码不一致，请重新输入';
                return false;
            }
            // 全部校检通过
            return true;
        }
    }
};
</script>
<style lang="scss" scoped>
.van-hairline--bottom:after{
    border-color: #d4d4d4;
}
</style>
<style lang="scss" scoped>
// 按钮
.btn_box{
    padding-top: 20px;
    text-align: center;
    .van-button--info{
        margin-right: 30px;
    }
}
// 外边框
.van-hairline--top-bottom::after{
    border-color: #dcdcdc;
}
</style>
