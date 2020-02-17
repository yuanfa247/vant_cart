<template>
    <div class="add_pro">
        <v-input
            v-for="n in inputNum"
            :key="n"
            @isOk="verifyInput"
        />
        <!-- 提交商品 -->
        <div class="btn_box">
            <van-button
                @click="addInputBox"
                type="warning"
                icon="plus"
                ></van-button>
            <van-button
                @click="commitGoods"
                type="primary"
                >提交商品</van-button>
            <van-button
                @click="cancel"
                type="danger"
                >取消</van-button>
        </div>
    </div>
</template>
<script>
import vInput from './inputBox';
import API_LIST from 'api/api.config';

export default {
    name: 'addGoodsSort',
    data() {
        return {
            // 输入框数量
            inputNum: 1,
            // 总的商品信息
            totalGoods: [],
            // 输入是否完成
            isFinish: false,
            // 是否重名
            isRename: true,
            tempData: ''
        };
    },
    // 输入框组件
    components: { vInput },
    // 方法对象
    methods: {
        // 提交商品
        commitGoods() {
            // 如果数组长度为空
            if (this.totalGoods.length === 0) {
                // 是否存在临时数据
                if (this.tempData) {
                    // 存在则添加存储对象
                    this.totalGoods.push(this.tempData);
                } else {
                    // 没有直接返回
                    this.$dialog.alert({
                        message: '请填写所有商品信息'
                    });
                    return;
                }
            }

            // post 请求提交产品信息
            this.$axios.post(API_LIST.commit_goods, this.totalGoods)
                .then(_d => {
                    // 商品添加成功
                    if (_d.data.goods_code === 7) {
                        this.$dialog.alert({
                            message: `恭喜你，${_d.data.goods_info}`
                        }).then(() => {
                            // 输入框数量归零
                            this.inputNum = 1;
                            // 商品信息清空
                            this.totalGoods = [];
                            // 触发填写完成事件
                            this.$emit('finish');
                        });
                    } else {
                        // 其他情况
                        this.$notify(_d.data.goods_info);
                    }
            });
        },
        // 取消
        cancel() {
            this.$emit('finish');
        },
        // 添加输入框
        addInputBox() {
            // 如果未完成
            if (!this.isFinish) {
                this.$dialog.alert({
                    message: '还有信息未填写~~！'
                });
                return false;
            }

            // 如果重名
            if (this.isRename) {
                this.$dialog.alert({
                    message: '商品重名了，请重新输入'
                });
                return false;
            }

            // 全部成功
            this.inputNum++;// 添加输入框
            
            this.totalGoods.push(this.tempData);// 存储添加的数据
            // 重置状态
            this.isFinish = false;
            this.isRename = true;
            return true;
        },
        // 验证输入信息
        verifyInput(obj) {
            // 如果对象不存在,则为未完成
            if (!obj) {
                this.isFinish = false;
                return;
            } else {
                this.isFinish = true;
            }

            // 没有重名
            if (!this.isRenameFn(obj)) {
                this.tempData = obj;
            }
        },
        // 是否重名
        isRenameFn(obj) {
            // 判断是否重名
            let result = this.totalGoods.find(val => val.name === obj.name);

            // 存在则重名
            if (result) {
                this.isRename = true;
                return true;
            } else {
                this.isRename = false;
                return false;
            }
        }

    }
};
</script>
<style lang="scss" scoped>
@import '~assets/sass/mixin';
// 按钮容器
.btn_box{
   text-align: center;
   padding-top: 0;
   background: #fff;
    width: 85%;
    margin: 0.5rem auto 0.5rem;
    background-color: #fff;
    border: 0.025rem solid #dcdcdc;
    padding: 0.5rem;
    position: relative;
    z-index: $add-sort-z-index;
   .van-button{
       margin-right: 30px;
       &:last-child{
           margin: 0;
       }
   }
}
.btn1{
    width: 100%;
    height: 100%;
}

</style>
