<template>
    <div class="header">
        <van-icon v-if="iconLeft" :name="iconLeft"
            @click="goBackFn"
            slot="right"/>
        <van-icon v-if="iconRight" :name="iconRight"
            @click="goCartPage"
            slot="right"/>
    </div>
</template>
<script>

export default {
    name: 'pro_header',
    props: {
        title: String,
        iconRight: String,
        iconLeft: String
    },
    methods: {
        // 返回首页
        goBackFn() {
            this.$router.go(-1);
        },
        // 添加购物车
        goCartPage() {
            this.$router.push('/cart');
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
.header{
    width: 100%;
    height: $navbar-height;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .van-icon{
        color: #fff;
        position: relative;

        &::after{
            $w: 70px;
            content: "";
            display: block;
            position: absolute;
            width: $w;
            height: $w;
            top: -34%;
            left: -36%;
            z-index: 1;
            border-radius: 50%;
            background-color: rgba($color: #000000, $alpha: .5);
        }
        // 图标是用before，加个层级
        &::before{
            position: relative;
            z-index: 5;
        }
    }
}

</style>
