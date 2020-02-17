<template>
    <!-- 产品规格 -->
    <van-sku
        v-model="showSku"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota-used="0"
        :hide-stock="sku.hide_stock"
        :close-on-click-overlay="true"
        :stock-threshold="20"
        @add-cart="onAddCartClicked"
        @buy-clicked="onBuyClicked"
        />
</template>
<script>
import imgSrc from 'assets/img/timg.jpg';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'productSize',
    data() {
        return {
            // sku商品规格
            goods: {
                title: '',
                picture: ''
            },
            goodsId: '',
            sku: {
                tree: [
                    {
                        k: '商品类型', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '1215', // skuValueId：规格值 id
                                name: '', // skuValueName：规格值名称
                                imgUrl: '', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img.yzcdn.cn/1p.jpg' // 用于预览显示的规格类目图片
                            },
                            {
                                id: '35462', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                previewImgUrl: imgSrc // 用于预览显示的规格类目图片

                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    },
                    {
                        k: '尺寸', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '1193', // skuValueId：规格值 id
                                name: '大' // skuValueName：规格值名称
                            },
                            {
                                id: '1194', // skuValueId：规格值 id
                                name: '小' // skuValueName：规格值名称

                            }
                        ],
                        k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                // 所有 sku 的组合列表
                list: [// 不同组合的规格
                    {
                        // 意为，s1 1215 对应 s2 id 1193
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 220 // 当前 sku 组合对应的库存
                    },
                    {
                        // 意为，s1 35462 对应 s2 id 1193
                        id: 6235, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '35462', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 220, // 当前 sku 组合对应的库存
                        imgSrc: imgSrc
                    },
                    {
                        // 意为，s1 35462 对应 s2 id 1194
                        id: 6542, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '35462', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1194', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 220, // 当前 sku 组合对应的库存
                        imgSrc: imgSrc

                    }
                ],
                price: '', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                messages: [
                    {
                        // 商品留言
                        datetime: '00', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '留言', // 留言名称
                        type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '0', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    }
                ],
                hide_stock: false // 是否隐藏剩余库存
            },
            showSku: false
        };
    },
    // 计算属性
    computed: {
        ...mapGetters(['getCartData'])
    },
    // 监听变化
    watch: {
        // 获得商品后，改变信息
        product(val) {
            this.goodsId = val._id;
            // 添加商品规格
            this.goods.title = val.title;
            // 预览图
            this.goods.picture = val.picSrc;
            // 价格
            this.sku.price = +val.price + 1.00;
            // 不同规格价格(sku的单位是分)
            this.sku.list[0].price = val.price * 100;
            this.sku.list[1].price = val.price * 100 - 10000;
            this.sku.list[2].price = val.price * 100 - 80000;
            // 预览树，规格信息
            this.sku.tree[0].v[0].name = val.title;

            // 规格图
            this.sku.tree[0].v[0].imgUrl = val.imgUrl;
            this.sku.tree[0].v[0].previewImgUrl = val.imgUrl;
        }
    },
    // props属性
    props: {
        product: {
            type: [Array, Object],
            default: () => []
        }
    },
    // 方法对象
    methods: {
        // sku加入购物车
        onAddCartClicked(_d) {
            let _temp = {
                goods_id: _d.goodsId,
                _title: this.goods.title,
                _num: _d.selectedNum,
                _price: _d.selectedSkuComb.price,
                _img: this.goods.picture, 
                _token: this.product.token
            };


            // 购物数据提取出一份 深拷贝
            let _cartData = JSON.parse(JSON.stringify(this.getCartData));

            // 浅拷贝直接改对象值
            let newArr = _cartData.filter(val => {
                // 如果id相同，修改数量，并且返回值
                if (val.goods_id === _temp.goods_id) {
                    // 加等于购物车数量
                    val._num += _temp._num;
                    return true;
                }
            });
            // 如果不存在相同的，则push进去
            if (newArr.length === 0) {
                _cartData.push(_temp);
            }

            // 覆盖vuex购物车数据
            this.changeCartData(_cartData);

            // 关闭sku提示
            this.showSku = false;
            // 提示
            this.$toast({
                type: 'success',
                message: '加入购物车成功',
                // 触发添加购物车成功事件
                onClose: () => {
                    this.$emit('addSucess');
                }
            });
        },
        // sku购买
        onBuyClicked(_d) {
            let msg = `恭喜你，购买成功,数量${_d.selectedNum},单价${_d.selectedSkuComb.price / 100}`;

            this.$dialog.alert({
                message: msg
            }).then(() => {
                // 跳转首页
                this.$router.push('/');
            });
        },
        // 显示购物车
        show() {
            this.showSku = true;
        },
        ...mapActions(['changeCartData'])
    }
};
</script>
