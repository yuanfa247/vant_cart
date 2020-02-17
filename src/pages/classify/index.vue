<template>
    <div class="classify_page">
        <v-header
            :title="msg"
            search></v-header>
        <div class="container">
            <!-- 侧边导航组件 -->
            <van-sidebar class="sidebar" v-model="activeKey">
                <van-sidebar-item
                    v-for="(item,index) in getGoodsSort"
                    :title="item.name"
                    :key=index
                    />
            </van-sidebar>

            <div class="right">
                <van-grid :border="false" :column-num="3">
                    <van-grid-item
                        @click="goProductDetails(item)"
                        v-for="(item,idx) in pageProduct"
                        :key="idx">
                        <!-- 懒加载 -->
                        <van-grid-item>
                            <van-image  :src="item.picSrc" />
                        </van-grid-item>
                        <div class="text"
                            v-text="item.title"></div>
                    </van-grid-item>
                </van-grid>
                <!-- 分页器 -->
                <van-pagination
                    v-model="currentPage"
                    :total-items="totalItems"
                    :items-per-page="pageItems"
                    mode="simple"
                    @change="getPageData"
                    />
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from './header';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'classify',
    data() {
        return {
            msg: '商品分类',
            // 商品对应的集合名
            setsName: '',
            // 侧栏活动索引
            activeKey: 0,
            // 当前页
            currentPage: 0,
            // 总记录数
            totalItems: 0,
            // 每页记录数
            pageItems: 9
        };
    },
    // 监听对象
    watch: {
        // 监听商品分类变化
        activeKey(value) {
            // 获得集合名
            this.setsName = this.getGoodsSort[value].token;
        },
        // 监听集合改变
        setsName(val) {
            // 改变分类商品
            this.getSetsProduct({
                collection: val
            });
        },
        // 监听商品列表长度
        productList(value) {
            // 获得长度，分页器自动计算 总页数 / 每页记录数，
            this.totalItems = value.length;
            // 当前页重置为 1;
            this.currentPage = 1;

            // 获得对应分页数据
            this.getPageData();
        }
    },
    // 计算对象
    computed: {
        ...mapGetters(['getGoodsSort', 'productList', 'pageProduct'])
    },
    // 组件
    components: { vHeader },
    methods: {
        // 跳转商品详情
        goProductDetails(n) {
            this.$router.push({
                path: '/product',
                query: {
                    goods_id: n._id,
                    collection: n.token,
                    _time: Date.now()
                }
            });
        },
        // 获得分页对应的数据
        getPageData() {
            /**
             * 需要请求的参数
             * collection 集合名，
             * page 页码
             *  pageSize 一页多少数据
             * */
            // 发送actions请求
            this.getPagesProduct({
                collection: this.setsName,
                page: this.currentPage,
                pageSize: this.pageItems
            });
        },
        // 初始化
        init() {
            // 获得商品数据
            this.getAllSort()
                .then(_d => {
                    // 对应集合名
                    this.setsName = this.getGoodsSort[this.activeKey].token;
                    this.getPageData();
            });
        },

        ...mapActions(['getAllSort', 'getSetsProduct', 'getPagesProduct'])
    },
    // 创建选项数据后
    created() {
        this.init();
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
.classify_page{
    height: 100%;
}
// 内容容器
.container{
    display: flex;
    height: 100%;
    // 左侧导航
    .sidebar{
        background-color: #fafafa;
        overflow: hidden;
        border-right: 1px solid #dcdcdc;
    }
    // 右侧内容
    .right{
        flex: 1;
        background-color: #fafafa;
        height: 100%;
        overflow-y: auto;
        // 文字
        .text{
            width: 140px;
            padding-top: 20px;
            font-size: $font-size-sm;
            color: $font-base-color;
            @include textOverflow;
        }
    }
}

// 左侧导航选中样式
.van-sidebar-item--select{
    border-color: #fff;
    position: relative;
    &::before{
        $h: 30px;
        content: '';
        background-color: $icon-link-color;
        z-index: 9999;
        width: 4px;
        height: $h;
        position: absolute;
        left: 2px;
        top: 50%;
        margin-top: -$h/2;
    }
}

// 分页样式
/deep/ .van-pagination__item,{
    // 选中样式
    &:active{
        background-color: $icon-link-color;
        color: #fff;
    }
    // disabled 禁用状态时候
    &--disabled{
        color: #646566;
        &:active{
            color: #646566;
            background-color: #f7f8fa;
        }
    }
    color: $icon-link-color;
}
</style>
