<template>
    <div class="cart_page">
        <!-- 头部 -->
        <v-header :title="msg" :rText="rText"
            @clear="clearCart"
            ></v-header>
        <div class="cart_content"></div>
        <!-- 为空时候显示的文字 -->
        <div v-if="isEmppty" class="cart_empty">
            <div class="cart_empty_text">当前购物车是空的，快去添加商品吧！</div>
            <van-button color="#f5540c"
                @click="lookGoodsFn"
                >去逛逛</van-button>
        </div>
        <van-checkbox-group v-model="result" ref="checkboxGroup">
            <!-- 更新价格 -->
            <!-- 购物车卡片内容 -->
            <v-goods-list
                v-if="!isEmppty"
                v-for="(item,idx) in getCartData"
                :key="idx"
                 @updateData="updateCart"
                :goods='item'>
                <!-- 单选框 -->
                <template v-slot:left>
                    <van-checkbox
                        v-slot:left
                        class="selected"
                        checked-color="#07c160"
                        :name="idx"/>
                </template>

            </v-goods-list>
        </van-checkbox-group>
        <!-- 提交订单 -->
        <van-submit-bar
                v-if="!isEmppty"
                :price="price"
                button-text="提交订单"
                @submit="onSubmit">
            <van-checkbox
                checked-color="#07c160"
                @click="checkedALl"
                v-model="checked"
                >全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
import vHeader from './header';
import vGoodsList from './goodsList';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'cart',
    components: { vHeader, vGoodsList },
    data() {
        return {
            msg: '购物车',
            rText: '清空购物车',
            checked: false,
            isEmppty: false,
            price: 0,
            // 多选框
            result: []
        };
    },
    // 计算对象
    computed: {
        ...mapGetters(['getCartData'])
    },
    // 监听对象
    watch: {
        // 监听选择对象
        result(arr) {
            // 更新价格
            this.updatePrice();
            // 判断是否全选
            if (arr.length === this.getCartData.length) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        }
    },
    // 方法对象
    methods: {
        // 提交订单
        onSubmit() {
            // 如果还未选择商品
            if (!this.price) {
                this.$toast({
                    type: 'fail',
                    message: '您还没有选择商品'
                });
                return;
            }

            // 支付成功提示
            let num = this.getGoodsNum();
            let msg = `恭喜你，支付成功，共${num} 件商品，共计${this.getPrice(this.price)} 元`;

            this.$dialog.alert({
                message: msg
            }).then(() => {
                // 支付成功删除指定商品
                this.paySuccess();
            });
        },
        // 去逛逛按钮
        lookGoodsFn() {
            // 前往首页
            this.$router.push('/');
        },
        // 清空购物车
        clearCart() {
            // 置空购物车
            this.changeCartData([]);
            this.isEmppty = true;
        },
        // 选择所有
        checkedALl() {
            this.checked = !this.checked;
            this.$refs.checkboxGroup.toggleAll(this.checked);
        },
        // 获得选择的商品数量
        getGoodsNum() {
            let num = 0;

            this.result.forEach(item => {
                num += this.getCartData[item]._num;
            });
            // 返回商品数量
            return num;
        },
        // 更新购物车
        updateCart() {
            // 产品数据
            let _data = localStorage.cartData;

            _data = JSON.parse(_data);
            // actions改变值
            this.changeCartData(_data);
            // 更新价格
            this.updatePrice();
        },
        // 更新价格
        updatePrice() {
            let arr = this.result;

            // 先清零
            this.price = 0;
            // 计算总价
            arr.forEach((val) => {
                let item = this.getCartData[val];

                this.price += item._price * item._num;
            });
        },
        // 单个产品价格处理
        getPrice(val) {
            // 如果是整数
            if (val / 100 % 1 === 0) {
                return val / 100 + '.00';
            } else {
                return val / 100;
            }
        },
        // 支付成功删除指定商品
        paySuccess() {
            // 先清零价格
            this.price = 0;
            // 先复制数组
            let arr = [...this.result];

            // 排序后反序
            arr.sort().reverse();
            // 清除选中
            this.result = [];

            // 判断是否全选
            if (arr.length === this.getCartData.length) {
                // 如果全选，清空购物车
                this.clearCart();
                return;
            }

            // 删除指定商品 (要深拷贝下)
            let _d = JSON.parse(JSON.stringify(this.getCartData));

            arr.forEach(n => {
                // 删除指定项
                _d.splice(n, 1);
            });
            // 改变vuex数据
            this.changeCartData(_d);

        },
        // 初始化
        init() {
            // 产品数据
            let _data = localStorage.cartData;

            // 如果不存在则提示 同时返回
            if (!_data) {
                this.isEmppty = true;
                return;
            } else {
                _data = JSON.parse(_data);
                // 如果购物车为空也让他返回
                if (_data.length === 0) {
                    this.isEmppty = true;
                    return;
                }
            }
            this.isEmppty = false;

            // 存为vuex数据
            this.changeCartData(_data);
        },
        ...mapActions(['changeCartData'])
    },
    // 创建后
    created() {
        // 初始化数据
        this.init();
    }
};
</script>
<style lang="scss" scoped>
.cart_page{
    position: relative;
    height: 100%;
    padding-bottom: 50PX;
    overflow-y: auto;
    background-color: #fff;
    // 提交订单
    .van-submit-bar{
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        // position: absolute;
        bottom: 50PX;
    }
    // 空提示
    .cart_empty{
        text-align: center;
        padding: 20px;
        &_text{
            padding-bottom: 20px;
        }
    }
}
</style>
