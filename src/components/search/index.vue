<template>
    <!-- 查询功能组件 -->
    <div>
        <div class="wrap_div clearfix">
            <input
                v-model.lazy.trim="userName"
                type="text" class="leftDiv" placeholder="请输入用户名"/>
            <div class="rightDiv">{{resolve}}</div>
        </div>
        <!-- 普通查询 -->
        <div class="btn_box">
            <van-button type="warning"
                @click="commitInfo">提交查询信息</van-button>
            <van-button type="primary"
                @click="findInfo">查看结果</van-button>
        </div>
    </div>
</template>

<script>
import API_LIST from 'api/api.config';

export default {
    name: 'search',
    data() {
        return {
            userName: '',
            resolve: ''
        };
    },
    methods: {
        // 提交信息
        commitInfo() {
            this.$axios.get(API_LIST.api_accept, {
                params: {
                    userName: this.userName
                }
            });
            // 清空数据
            this.userName = '';
        },
        // 查询信息
        findInfo() {
            this.$axios.get(API_LIST.api_send)
                .then(_d => {
                    this.resolve = _d.data.name;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
// 输入容器
.wrap_div{
    $child-width: 270px;
    $child-height: 60px;
    width: 600px;
    margin: 20px auto 30px;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    height: 300px;
    padding: 20px;
    .leftDiv{
        float: left;
        width: $child-width;
        padding: 0 10px;
        line-height: $child-height;
        font-size: 28px;
        background-color: #eee;
        border: 1px solid #dcdcdc;

    }
    .rightDiv{
        // 单行文字溢出
        float: right;
        padding: 0 10px;
        font-size: 28px;
        white-space: nowrap;
        line-height: $child-height;
        height: $child-height;
        width: $child-width;
        background-color: #e0e0e0;
        border: 1px solid #dcdcdc;
    }
}
// 按钮
.btn_box{
    text-align: center;
}
.van-button--warning{
    margin-right: 30px;
}
.van-button--default{
    margin-right: 30px;
}
</style>
