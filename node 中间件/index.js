let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let jsonParse = bodyParser.json();// 创建 applications / json解析器
let { CODE } = require('./db/config');// 状态码

// 用户信息接口
let { registerUser, loginQuery } = require('./db/userDB');
// 产品数据接口
let { addProData, getGoodsData, getOneProduct,getCollectionGoods, getPagesData, addSortData } = require('./db/productDb');

let getImg = require('./static');


// 解决跨域问题
app.all('*', function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Control-Max-Age", "3600");
    next(); // 执行下一个路由
});

// 注册
app.post('/api_regist',function (req,res) {
    let userData = '';
    req.on('data',function(_d) {
        userData = JSON.parse(_d);
    });
    req.on('end',function() {
        // 注册用户
        registerUser(userData).then(_d=>{
            // 注册成功
            res.send(_d);
        }).catch(err=>{
            // 注册失败
            res.send(err);
        });
    })
})

// 登录接口
app.post('/api_login',jsonParse,function(req,res) {
    // 登录信息
    let login_infos = req.body;
    // 查询数据库
    loginQuery(login_infos).then(_d=>{
            res.send(_d);
        }).catch(err=>{
            // 数据库错误
            res.send({
                login_info: '连接数据库失败'
            });
        })
});

// 批量录入商品
app.post('/add_product',jsonParse,function(req,res) {
    // 数据库接口
    addProData(req.body)
        .then(_d=>{
            res.send({
                goods_info: '商品添加成功',
                goods_code: CODE.goods_code1
            });
        }).catch(()=>{
            res.send({
                goods_info: '商品添加失败',
                goods_code: CODE.goods_code2
            });
        });
});

// 获得所有数据
app.get('/all_product',function (req,res) {
    // 获得所有数据并发送
    getGoodsData()
        .then(_d=>{
            res.send(_d);
        }).catch(err=>{
            res.status(500).end();
        })
});

// 接口需要的的数据 goods_id collection
// 获得一个商品 
app.get('/one_product',function(req,res) {
    let _obj = req.query;
    // 查询指定数据
    getOneProduct(_obj)
        .then(_d=>{
            res.send(_d);
        })
        .catch(err=>{
            res.status(304).end();
        })
});

// 返回集合对应的数据
app.get('/sets_product',function(req,res) {
    let data = req.query;

    getCollectionGoods(data)
    .then(_d=>{
        res.send(_d);
    }).catch(err=>{
        console.log(err);
        res.status(304).end();
    })
})

// 跳过页码查找商品
app.get('/pages_product',function(req,res) {
    let data = req.query;

    getPagesData(data)
    .then(_d=>{
        res.send(_d);
    }).catch(err=>{
        console.log(err);
        res.status(304).end();
    });
})

// 之前的方法集 搜索功能
{
    // 存储临时数据的变量
    let tempData = {
        arrs: [{
            id: 'n1',
            name: 'a_name',
            vals: 'aaa',
            infos: '家电'
        }, {
            id: 'n2',
            name: 'b_name',
            vals: 'bbb',
            infos: '汽车'
        }, {
            id: 'n3',
            name: 'c_name',
            vals: 'ccc',
            infos: '女装'
        }]
    };

    // 搜索结果
    let _result = null;

    // 过滤方法
    function filterData(name) {
        return tempData.arrs.find( items => items.vals === name);
    }
    // 查询提交的数据
    app.get('/api_accept',function (req,res) {
        _result = filterData(req.query.keywords);
        // 关闭连接
        res.end();
    })
    
    // 发送数据
    app.get('/api_send',function (req,res) {
        // 三目运算返回结果，不存在返回不存在
        let send_data = _result ? _result : {name:'没有结果'};
        res.send( send_data);
    });
}
// 使用静态目录
app.use('/static',express.static("./static/"));

// 返回服务器图片
app.get('/slider',function(req,res) {
    
    let _d = getImg.getImageFiles('./static/slider/');
    // 本地网址
    let host = 'http://localhost:5489/';
    // 替换数组数据
    _d = _d.map(val=>{
        return val.replace('./',host);
    });
    res.send(_d);
})

// 图标文字信息
let iconText = ['团购新品','新品上市','优惠信息','在线课程','机票酒店','餐饮服务','酒水饮品','限时秒杀','拍卖快讯','手机通讯'];

// 返回图标
app.get('/icon',function(req,res) {
    let _d = getImg.getImageFiles('./static/icon/'); // 不要忘了 / 目录要带 /
    // 本地网址
    let host = 'http://localhost:5489/';
    // 替换数组数据
    _d = _d.map((val,idx)=>{
        return {
            imgSrc: val.replace('./',host),
            title: iconText[idx]
        };
    });
    res.send(_d);
})

// 监听端口号
app.listen(5489,function () {
    console.log("5489,中间件启动");
})
