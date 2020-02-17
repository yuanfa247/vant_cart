<template>
    <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="goBackFn">
        <van-icon v-if="iconRight" :name="iconRight" slot="right"/>
    </van-nav-bar>
</template>
<script>

export default {
    name: 'login_header',
    props: {
        title: String,
        iconRight: String
    },
    methods: {
        // 返回首页
        goBackFn() {
            this.$router.go(-1);
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
