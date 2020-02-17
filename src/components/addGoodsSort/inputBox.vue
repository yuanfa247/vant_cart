<template>
    <!-- 输入容器 -->
    <div class="wrap_div">
        <!-- 商品名和价格 -->
        <div class="clearfix">
            <input type="text" class="leftDiv" placeholder="请输入栏目名"
                v-model.lazy.trim="goodsName"
            />
            <input type="text" class="rightDiv" placeholder="栏目标识(可留空)"
                v-model.lazy.trim="token"
            />
        </div>
        <!-- 描述 -->
        <div class="clearfix" style="padding: 10px 0 0;">
            <input type="text" class="leftDiv" placeholder="请输入栏目描述"
                v-model.lazy.trim="classify"
            />
            <input type="text"
                class="rightDiv"
                v-model.lazy.trim="infos"
                placeholder="请填写文字信息"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'inputBox',
    data() {
        return {
            goodsName: '',
            token: '',
            classify: '',
            infos: '',

            // 存储商品栏目信息
            goodsInfos: {
                name: '',
                infos: '',
                classify: ''
            }
        };
    },
    // 监听对象
    watch: {
        goodsName(value) {
            this.goodsInfos.name = value;
        },
        token(value) {
            // 英文开头的正则
            var reg = /^[A-z]\w+$/;

            // 验证不通过
            if (!reg.test(value)) {
                this.$toast('必须是英文开头的标识');
                return;
            }
            this.goodsInfos.token = value;
        },
        classify(value) {
            this.goodsInfos.classify = value;
        },
        infos(value) {
            this.goodsInfos.infos = value;
        },
        // 判断是否装满
        goodsInfos: {
            handler(value) {
                // 提取出对象的值
                let _valueArr = Object.values(value);
                // 判断未填写为空
                let isTrue = _valueArr.includes('');

                // 如果还未填写完成 直接返回
                if (isTrue) {
                    this.$emit('isOk', false);
                    return;
                };

                // 填写完成触发父组件方法
                this.$emit('isOk', value);
            },
            // 深层模式
            deep: true
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
// 输入容器
.wrap_div{
    position: relative;
    z-index: $add-sort-z-index;
    $child-width: 48%;
    $child-height: 60px;
    width: 85%;
    margin: 20px auto 20px;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    padding: 20px;
    .leftDiv{
        float: left;
        width: $child-width;
        padding: 0 10px;
        line-height: $child-height;
        font-size: 28px;
        background-color: #eee;
        border: 1px solid #dcdcdc;

    }
    .rightDiv{
        // 单行文字溢出
        @extend .element;
        overflow: hidden;
        float: right;
        padding: 0 10px;
        font-size: 28px;
        white-space: nowrap;
        line-height: $child-height;
        height: $child-height;
        width: $child-width;
        background-color: #eee;
        border: 1px solid #dcdcdc;
        position: relative;
    }
    // 上传文件
    .file{
        display: none;
        // opacity: 0;
    }
}
</style>
