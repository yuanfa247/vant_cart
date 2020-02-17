<template>
    <div class="admin_page">
        <!-- 遮罩层 -->
        <div class="shadow_layer" v-if="isAddPro"></div>
        <div class="title">欢迎管理员：{{loginInfos.username}}</div>
        <div v-if="isShowBtn" class="btn_box" >
            <van-button
                type="primary"
                @click="showAddPro"
            >录入分类</van-button>
            <van-button
                type="warning"
                @click="showPopup"
            >查看分类</van-button>
        </div>
        <!-- 添加商品组件 -->
        <div class="sort-container">
            <v-add-goods-sort
                @finish="showAddPro"
                v-if="isAddPro"/>
        </div>

        <!-- 弹出层 -->
        <van-popup v-model="isShowPopup"
            position="bottom">
            <!-- 分页器 -->
            <van-picker
                :columns="columns"
                @change="onChange" />
        </van-popup>
    </div>
</template>
<script>
import vAddGoodsSort from 'components/addGoodsSort';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'admin_pages',
    data() {
        return {
            showEnter: true, // 显示录入按钮
            isAddPro: false, // 添加商品
            columns: [],// 分页器
            isShowPopup: false// 弹出层
        };
    },
    // 监听对象
    watch: {
        getGoodsSort(value) {
            // 等于分类
            this.columns = value.map(item => item.name);
        }
    },
    components: { vAddGoodsSort },
    // 计算对象
    computed: {
        // 显示录入按钮
        isShowBtn() {
            return this.showEnter;
        },
        ...mapGetters(['loginInfos', 'getGoodsSort'])
    },
    // 方法对象
    methods: {
        // 显示录入商品
        showAddPro() {
            this.isAddPro = !this.isAddPro;
        },
        // 关闭按钮
        closeBtn() {
            this.showEnter = false;
        },
        // 弹出显示分页器
        showPopup() {
            this.isShowPopup = true;
        },
        // 选择器组件
        onChange(picker, value, index) {
            // this.$toast(`当前值：${value}, 当前索引：${index}`);
        },
        ...mapActions(['getAllSort'])
    },
    // 创建后
    created() {
        // 获得所有商品分类信息
        this.getAllSort();
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
// 页面样式
.admin_page{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
// 录入商品样式
.btn_box{
    position: relative;
    right: 0;
    text-align: center;
    z-index: 999;
    .van-button--primary{
        margin-right: 30px;
    }
}
// 遮罩层
.shadow_layer{
    position: fixed;
    z-index: $shadow-z-index;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #333, $alpha: .4);
}
.title{
    text-align: center;
    padding: 20px;
    font-size: $icon-font-size;
    color: $font-base-color;
}
</style>
