<template>
    <!-- 类目 -->
    <nav class="classify">
        <!-- 路由，前往分类页 -->
        <router-link to="/classify"
            class="classify_icon"
            v-for="(n,idx) in iconData"
            :key="idx">
            <img class="icon_img" :src="n.imgSrc" alt="">
            <span class="icon_text"
                v-text="n.title"
                ></span>
        </router-link>
    </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'iconSort',
    // 计算对象
    computed: {
        ...mapGetters(['iconData'])
    },
    // 方法对象
    methods: {
        ...mapActions(['initIcon'])
    },
    // 创建后
    created() {
        // 初始化图标
        this.initIcon();
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
// 类目 icon
.classify{
    display: flex;
    flex-flow: row wrap;
    padding-bottom: 45px;
    background: #fff;
    // 单独每个类目
    .classify_icon{
        width: 20%;
        padding-top: 30px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        &:nth-child(odd){
            padding-top: 35px;
        }
        // 图片
        .icon_img{
            $w: 94px;
            border-radius: 50%; // 测试用
            width: $w;
            height: $w;
        }
        // 文字
        .icon_text{
            font-size: 26px;
            padding-top: 25px;
            color: $font-base-color;
        }
    }
}

</style>
