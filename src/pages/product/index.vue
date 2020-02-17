<template>
    <div class="product">
        <!-- 导航栏 -->
        <v-header
            iconLeft='arrow-left'
            iconRight='cart'></v-header>
        <!-- 内容 -->
        <div class="product_content">
            <div class="product_content_picbox"><img :src="productInfo.picSrc" :alt="productInfo.title"></div>
            <van-cell-group>
                <van-cell  :value="productInfo.title" />
            </van-cell-group>
            <!-- 商品信息 -->
            <div class="infos">
                <div class="all_price">
                    <ins class="new_pric"><i
                    v-show="productInfo.price"
                    >￥</i>{{productInfo.price}}</ins>
                    <del class="del_price">{{productInfo.delPrice}}</del>
                </div>

                <span
                    v-show="productInfo.sold"
                    class="sold">月销量{{productInfo.sold}}件</span>
                <div class="site">北京</div>
            </div>
        </div>
        <!-- 底栏 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o"
                @click="service"
                text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车"
                @click="goCartPage"
                v-if="isShowTip"
                :info="info_cart" />
            <van-goods-action-icon icon="cart-o" text="购物车"
                @click="goCartPage"
                v-else/>
            <van-goods-action-button type="warning" text="加入购物车"
                @click="addCart" />
            <van-goods-action-button type="danger" text="立即购买"
                @click="buyGoods"/>
        </van-goods-action>

        <!-- 商品规格 -->
        <v-sku
            ref="sku"
            :show="showSku"
            :product="productInfo"
            @addSucess="showTip"
            ></v-sku>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import vHeader from './header';
import vSku from './productSize';

export default {
    name: 'product',
    // 组件
    components: { vHeader, vSku },
    // 选项数据data
    data() {
        return {
            msg: '产品详情',
            showSku: false,
            info_cart: 0,
            isShowTip: false
        };
    },
    // 计算对象
    computed: {
        ...mapGetters(['productInfo'])
    },
    // 方法对象
    methods: {
        // 客服提示
        service() {
            this.$toast('客服正忙，请稍后再来');
        },
        // 购买提示
        buyGoods() {
            this.$toast({
                message: '请选择商品规格~！',
                onClose: () => {
                    // 显示sku商品规格
                    this.$refs.sku.show();
                }
            });
        },
        // 返回前一个页面
        goBackFn() {
            this.$router.go(-1);
        },
        // 加入购物车
        addCart() {
            this.$refs.sku.show();
        },
        // 显示购物车角标
        showTip() {
            let query = this.$route.query;
            let _d = localStorage.getItem('cartData');

            // 显示角标判断
            if (_d) {
                _d = JSON.parse(_d);
                let item = _d.find(val => val.goods_id === query.goods_id);

                if (item) {
                    this.info_cart = item._num;
                }
            }
            // 最后判断
            if (this.info_cart === 0) {
                this.isShowTip = false;
            } else {
                this.isShowTip = true;
            }
        },
        // 去购物车页面
        goCartPage() {
            this.$router.push('/cart');
        },
        // 初始化
        init() {
            // 路由配置
            let query = this.$route.query;
            // 提交查询商品信息
            this.getProduct(query);
            // 判断是否显示购物车角标
            this.showTip();
        },
        ...mapActions(['getProduct'])
    },
    // 创建后
    created() {
        // 初始化
        this.init();
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
// 导航栏

// 内容区样式
.product_content{
    // 图片容器
    &_picbox{
        height: 650px;
        overflow: hidden;
        img{
            height: auto;
        }
    }
    // 文字信息
    .infos{
        background-color: #fff;
        width: 100%;
        padding: 24px 15px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        border:solid #dcdcdc;
        border-width: 0 0 1px ;
        // 所有价格
        .all_price{
            flex: 1;
            display: flex;
            align-items: flex-end;
            .new_pric{
                font-size: $price-font-size;
                color: $link-active-color;
                // ￥符号
                i{
                    font-size: $font-size-sm;
                }
            }
                // 删除价格
            .del_price{
                background-color: #fff;
                padding: 25px 15px 0;
                text-align: left;
                color: $font-tint-color;
                font-size: $font-size-sm;
            }
        }
        // 已经售出
        .sold{
            flex: 1;
            text-align: center;
            font-size: $base-font-size;
            color: $font-tint-color;
        }
        // 地点
        .site{
            flex: 1;
            text-align: right;
            font-size: $base-font-size;
            color: $font-tint-color;
        }
    }
}
</style>
