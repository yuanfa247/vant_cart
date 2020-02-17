<template>
    <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        :right-text="rText"
        @click-right="clearCartBtn"
        @click-left="goBackFn">
    </van-nav-bar>
</template>
<script>

export default {
    name: 'cart_header',
    props: {
        title: String,
        iconRight: String,
        rText: String
    },
    methods: {
        // 返回首页
        goBackFn() {
            this.$router.go(-1);
        },
        // 清空购物车
        clearCartBtn() {
            // 触发事件
            this.$emit('clear');
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
.van-nav-bar{
    .van-icon{
        color: $icon-link-color;
    }
    &__text{
        color: $icon-link-color;
    }
}
</style>
