<template>
    <div :class="['header',{'head_opatity':opatity}]"
    >
        <!-- 左箭头 -->
        <van-icon v-if="showLeft" @click="goBackFn" name="arrow-left" />
        <!-- 搜索框 -->
        <div class="search">
            <van-search
                v-model.trim.lazy="value"
                @focus="getFocus"
                @blur="blurAbort"
                :placeholder="defaultText"
                @search="onSearch"
                />
        </div>
        <!-- 搜索按钮 -->
        <button class="search_box"
        v-if="!opatity"
        @click="onSearch(value)" v-text="msg"></button>
    </div>
</template>
<script>
import API from 'api/api.config.js';

export default {
    name: 'home_head',
    data() {
        return {
            value: '',
            msg: '搜索',
            defaultText: '好物随心享，有好多你喜欢的',
            // 背景透明
            opatity: true
        };
    },
    // 属性对象
    props: {
        showLeft: Boolean
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

            this.$axios.get(API.api_accept, {
                params: {
                    // 之前是use
                    keywords: this.value
                }
            }).then(() => { // 操作完成再去请求下
                this.findInfo();
            });
            // 清空数据
            this.value = '';
        },
        // 查询信息
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
    // 背景色
    &.head_opatity{
        background-color: transparent;
        border-bottom: 0;
        .van-search{
            background-color: transparent;
        }
    }
}
</style>
