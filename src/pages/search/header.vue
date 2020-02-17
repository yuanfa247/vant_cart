<template>
    <div class="header">
        <!-- 左箭头 -->
        <van-icon @click="goBackFn" name="arrow-left" />
        <!-- 搜索框 -->
        <div class="search">
            <van-search
                v-model="value"
                @focus="getFocus"
                @blur="blurAbort"
                :placeholder="defaultText"
                @search="onSearch"
                />
        </div>
        <!-- 搜索按钮 -->
        <button class="search_box"  @click="onSearch(value)" v-text="msg"></button>
    </div>
</template>
<script>
import API from 'api/api.config.js';

export default {
    name: 'search_head',
    data() {
        return {
            value: '',
            msg: '搜索',
            defaultText: '好物随心享，有好多你喜欢的'
        };
    },
    methods: {
        // 回到上一页
        goBackFn() {
            this.$router.go(-1);
        },
        // 获得焦点
        getFocus() {
            this.defaultText = '可以查询 aaa bbb ccc';
        },
        // 失去焦点
        blurAbort() {
            this.defaultText = '好物随心享，有好多你喜欢的';
        },
        // 开始搜索 
        onSearch() {
            // 如果为空，直接返回提示
            if (!this.value) {
                this.$toast('搜索结果不能为空');
                return;
            }

            // 请求接口，
            this.$axios.get(API.api_accept, {
                params: {
                    keywords: this.value
                }
            }).then(() => {
                this.findInfo();
            });
            // 清空数据
            this.value = '';
        },
        // 获得搜索结果 // 查询信息
        findInfo() {
            this.$axios.get(API.api_send)
                .then(_d => {
                    let data = _d.data;
                    this.$notify({ type: 'success', message: data.infos });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';

.header{
    display: flex;
    background-color: #fff;
    height: $navbar-height;
    height: 100px;
    align-items: center;
    overflow: hidden;
    padding: 0 20px;
    border-bottom: 1PX solid $border-color;
    .search{
        flex: 1;
    }
    // 搜索按钮
    .search_box{
        font-size: $title-font-size;
        color: $font-base-color;
        &:active{
            color: #999;
        }
    }
}
</style>
