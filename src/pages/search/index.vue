<template>
    <div class="search_page">
        <v-header />
    </div>
</template>
<script>
import vHeader from './header';
export default {
    name: 'search_page',
    data() {
        return {
            msg: '这是搜索页面'
        };
    },
    // 注册组件
    components: { vHeader }
};
</script>
<style lang="scss" scoped>
.search_page{
    box-sizing: content-box;
    background-color: #fff;
    height: 100%;
    padding-bottom: 50PX;
}
</style>
