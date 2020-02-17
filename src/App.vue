<template>
  <div id="app" v-cloak>
        <div class="g-container">
            <keep-alive :max="10">
                <!--这里是会被缓存的组件-->
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <!-- 这是不会缓存的组件 -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>

        <div v-if="$route.meta.showFooter" class="g-footer">
            <v-footer></v-footer>
        </div>
  </div>
</template>

<script>
import vFooter from 'components/footer';
export default {
    name: 'App',
    components: { vFooter }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 完成后显示 */
[v-cloak] {
    display: none!important;
}

</style>
