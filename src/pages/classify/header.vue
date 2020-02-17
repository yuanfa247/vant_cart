<template>
    <div class="header">
        <div class="title"
            v-text="title"></div>
        <div class="search_box"
            @click="goSearch"
            v-if="search">
            <div class="search">
                <van-icon name="search" color="#c3c1c1"/>
                <span class="search_text" v-text="msg"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'classify_head',
    data() {
        return {
            msg: '请输入搜索关键词'
        };
    },
    props: {
        title: String,
        search: Boolean
    },
    methods: {
        // 跳转搜索页面
        goSearch() {
            this.$router.push('/search');
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
    border-right: 1px solid #dcdcdc;
    .title{
        width: 23%;
        font-size: $title-font-size;
        text-align: center;
        color: #333;
        line-height: $navbar-height;
        font-weight: bold;
    }
    // 大的搜索容器
    .search_box{
        flex: 1;
        padding: 0 25px;
        display: flex;
        align-items: center;
        // 搜索框
        .search{
            flex: 1;
            padding: 0 20px;
            background-color: #f7f7f7;
            height: 60%;
            border-radius: 20px;
            display: flex;
            align-items: center;
            // 搜索文字
            .search_text{
                padding-left: 10px;
                font-size: $base-font-size+2;
                color: $font-tint-color;
                letter-spacing: 1px;
            }
        }
    }
}
</style>
