<template>
    <div class="home_page">
        <v-header
            v-if="headShow"
            class="header_search"
            />
        <!-- 轮播图组件 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item class="slider_img"
                v-for="(image, index) in sliderImg"
                :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
        <!-- 图标组件 -->
        <v-iconSort></v-iconSort>
        <!-- 商品列表容器 -->
        <div class="goods_colum"
            v-for="(item,idx) in getGoodsSort"
            v-if="idx < 3"
            :key="idx"
            >
            <!-- 粘性布局 吸顶 -->
            <van-sticky>
                <h3 class="goods_colum_title"
                    v-text="item.name"></h3>
            </van-sticky>
            <!-- 精选商品 -->
            <van-grid
                :gutter="10"
                :column-num="2"
                >
                <van-grid-item
                    @click="goProduct(n)"
                    v-for="(n,idx) in item.product_a"
                    v-if="idx < 6"
                    :key=idx>
                    <van-image
                        width="100%"
                        :src="n.picSrc"
                        fit="fill"
                        :alt="n.title"
                     />
                        <!-- 商品标题 -->
                        <div class="van-multi-ellipsis--l2 goods_text"
                        v-text="n.title"></div>
                     <!-- 商品信息 -->
                     <del class="del_price">{{n.delPrice}}</del>
                    <p class="infos">
                        <ins class="new_pric"><i
                            v-show="n.price"
                            >￥</i>{{n.price}}</ins>
                        <span
                            v-show="n.sold"
                            class="sold">{{n.sold}}已售</span>
                    </p>
                </van-grid-item>
            </van-grid>
            <!-- 热门分类 -->
            <van-grid :column-num="3">
                <van-grid-item
                    @click="goProduct(n)"
                    v-for="(n,idx) in item.product_b"
                    :key=idx
                    v-if="idx < 6"
                >
                    <van-image
                        width="100%"
                        :src="n.picSrc"
                        fit="fill"
                        :alt="n.title"
                     />
                     <div class="van-multi-ellipsis--l2 goods_text"
                     v-text="n.title"></div>
                    <!-- 商品信息 -->
                     <del class="del_price">{{n.delPrice}}</del>
                    <p class="infos">
                        <ins class="new_pric"><i
                            v-show="n.price"
                            >￥</i>{{n.price}}</ins>
                    </p>
                </van-grid-item>
            </van-grid>
            <!-- 猜你喜欢 -->
            <van-grid :column-num="4">
                <van-grid-item
                    @click="goProduct(n)"
                    v-for="(n,idx) in item.product_c"
                    :key=idx
                    v-if="idx < 8"
                >
                    <!-- 图片 -->
                    <van-image
                        width="100%"
                        :src="n.picSrc"
                        fit="fill"
                        :alt="n.title"
                     />
                     <div class="van-multi-ellipsis--l2 goods_text"
                     v-text="n.title"></div>
                </van-grid-item>
            </van-grid>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vHeader from './header';
import vIconSort from './iconSort';

export default {
    name: 'home',
    // 注册组件
    components: { vHeader, vIconSort },
    data() {
        return {
            // 显示搜索
            headShow: true,
            timer: null
        };
    },
    // 计算对象
    computed: {
        ...mapGetters(['getGoodsSort', 'getLogin', 'sliderImg'])
    },
    // 方法对象
    methods: {
        // 显示隐藏头部
        showScroll(event) {
            let _top = document.documentElement.scrollTop;

            // 节流
            this.timer && clearTimeout(this.timer);
            setTimeout(() => {
                if (_top > 150) {
                    this.headShow = false;
                } else {
                    this.headShow = true;
                }
            }, 200);
        },
        // 跳转产品详情页面
        goProduct(n) {
            this.$router.push({
                name: 'product',
                query: {
                    goods_id: n._id,
                    collection: n.token,
                    _time: Date.now()
                }
            });
        },
        // 初始化
        init() {
            // 是否提示过
            let isHint = localStorage.getItem('isHint');
            // 存在用户信息
            let userinfos = localStorage.getItem('userinfos');

            // 如果是登录状态
            if (userinfos) {
                // 没提示过，才给提示
                if (!isHint) {
                    // 解析成对象
                    userinfos = JSON.parse(userinfos);
                    this.$notify({
                        type: 'success',
                        message: `尊贵的${userinfos.username}，欢迎回来`
                    });
                    localStorage.setItem('isHint', '111');
                }
            }
            // 获得商品数据
            this.getAllSort();
            // 获得轮播图
            this.getSlider();
        },
        ...mapActions(['getAllSort', 'getSlider'])
    },
    // 创建选项数据后
    created() {
        this.init();
        window.addEventListener('scroll', this.showScroll);
    },
    // 销毁后移除事件
    destroyed() {
        window.removeEventListener('scroll', this.showScroll);
    }
};
</script>

<style lang="scss" scoped>
@import '~assets/sass/mixin';
.header_search{
    position: fixed;
    width: 100%;
    z-index: 999;
}
.home_page{
    padding-bottom: 50PX;
}
// 标题
// 吸顶样式
/deep/ .van-sticky--fixed{
    .goods_colum_title{
        background: #fff;
        font-size: 36px;
        text-align: center;
        padding: 50px 0 20px;
    }
    .goods_colum_title::after{
        background-color: #fff;
    }
}
.title{
    font-size: 36px;
    text-align: center;
    padding: 50px 0 20px;
}
// 轮播图组件
.van-swipe{
    height: 500px;
}
.my-swipe .van-swipe-item {
    height: 500px;
    // .slider_img{
    //     width: 100%;
    //     height: 100%;
    // }

}
// 列表容器
.goods_colum{
    // 标题
    &_title{
        @include textOverflow;
        font-size: 32px;
        text-align: center;
        padding: 20px;
        position: relative;
        &:before{
            content: "";
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 70%;
            transform: translateX(-50%);
            z-index: -2;
            border-bottom: 1PX solid $border-color;
        }
        &:after{
            content: "";
            display: block;
            position: absolute;
            left: 50%;
            top: 0;
            width: 30%;
            height: 100%;
            background: $base-background-color;
            z-index: -1;
            transform: translateX(-50%);
        }
    }
    .goods_text{
        padding-top: 30px;
        font-size: 28px;
        word-break: break-all;
    }
    // 删除价格
    .del_price{
        padding: 25px 15px 0;
        text-align: left;
        width: 100%;
        color: $font-tint-color;
        font-size: $font-size-sm;
    }
    // 文字信息
    .infos{
        width: 100%;
        padding: 24px 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .new_pric{
            font-size: $price-font-size;
            color: $link-active-color;
            // ￥符号
            i{
                font-size: $font-size-sm;
            }
        }
        // 已经售出
        .sold{
            font-size: $base-font-size;
            color: $font-tint-color;
        }
    }
}
</style>
