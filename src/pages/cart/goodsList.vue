<template>
    <div class="goods_items">
        <slot name="left"></slot>
        <div class="card">
        <van-card
            :num="value"
            :price="goods._price | getPrice"
            :title="goods._title"
            @click-thumb="goGoodsPage"
            :thumb="goods._img">
            <van-stepper slot="footer" v-model="value" />
        </van-card>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'goodsList',
    props: [ 'goods' ],
    data() {
        return {
            checked: false,
            value: 1
        };
    },
    // 监听函数
    watch: {
        value(value) {
            // 同步修改localStorage值
            let _d = localStorage.getItem('cartData');

            _d = JSON.parse(_d);
            _d.find(item => {
                if (item.goods_id === this.goods.goods_id) {
                    item._num = value;
                }
            });

            // 让vuex去改变值
            this.changeCartData(_d);
            this.$emit('updateData');
        }
    },
    // 过滤器
    filters: {
        // 获得产品价格
        getPrice(val) {
            // 保险起见取个绝对值
            let _val = Math.abs(val);
            // 如果是整数
            if (_val / 100 % 1 === 0) {
                return _val / 100 + '.00';
            } else {
                return _val / 100;
            }
        }
    },
    // 方法
    methods: {
        // 前往指定商品页
        goGoodsPage() {
            this.$router.push({
                name: 'product',
                query: {
                    goods_id: this.goods.goods_id,
                    collection: this.goods._token
                }
            });
        },
        ...mapActions(['changeCartData'])
    },
    // 创建后
    created() {
        this.value = this.goods._num;
    }
};
</script>
<style lang="scss" scoped>
.goods_items{
    position: relative;
    display: flex;
    background-color: #fafafa;
    .selected{
        padding-left: 20px;
    }
    // 购物车卡片
    .card{
        flex: 1;
        position: relative;
    }
    // 步进器
    .van-stepper{
        background-color: #fff;
        position: absolute;
        right: 12%;
        bottom: 10%;
    }
}
</style>
