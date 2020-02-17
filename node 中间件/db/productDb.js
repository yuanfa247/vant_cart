// mongoDB
let { MongoClient, ObjectID } = require("mongodb");

const { DB_CONN_STR, DB_NAME, PRODUCT_DB_CONLLECT } = require('./config');

// 添加多个商品栏目 insertMany 接收的是个数组
let addProData = (insertData) => {
    return new Promise((resolve,reject)=>{
        // 连接数据库
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology: true},function(err,client) {
            if(err) reject("连接数据库失败~！");

            let db = client.db(DB_NAME);
            let sets = db.collection(PRODUCT_DB_CONLLECT);
            // 插入数据
            sets.insertMany(insertData,function(err,result) {
                // 关闭客户端
                client.close();
                // 存在错误
                if (err) {
                    reject("插入数据失败");
                };
                resolve("插入数据成功");

            })
            
        })
    })
};
// 添加多个商品栏目同时创建集合
let addSortData = (arr) => {
    let _hsArr = [];
    // 如果不存在生成随机集合名
    arr.forEach((item,idx) => {
        if(!item.token){
            _hsArr[idx] = "goods_" + createHash(8);
        }else{
            _hsArr[idx] = item.token;
        }
    })

    return new Promise((resolve,reject)=>{
        // 链接数据库客户端
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology: true},function(err,client) {
            // 数据库连接失败
            if(err) reject("连接数据库失败~！");

            let db = client.db(DB_NAME);
            let sets = db.collection(PRODUCT_DB_CONLLECT);
            // 遍历创建集合
            _hsArr.forEach(item=>{
                // 创建新的商品集合 
                db.createCollection(item,{strict: true},function(err,result) {
                    if(err){
                        console.log("集合已经存在");
                    }
                })
            });
            // 插入数据
            sets.insertMany(arr,{strict: true},function(err,result) {
                // 存在错误
                if (err) {
                    console.log(err);
                    reject("插入数据失败");
                };
                // 关闭客户端
                client.close();
                resolve("插入数据成功");
            });

        })
    })
};

// 生成随机hash
function createHash (hashLength) {
    if (!hashLength || typeof(Number(hashLength)) != 'number') {return;}
    var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var hs = [];
    var hl = Number(hashLength);
    var al = ar.length;
    for (var i = 0; i < hl; i ++) {
        hs.push(ar[Math.floor(Math.random() * al)]);
    }
     
    return hs.join('');
}

// 获得所有产品数据
let getGoodsData = () => {
    return new Promise((resolve,reject)=>{
        // connect连接
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology: true},function(error,client){
            if(error) return reject(error);
            let myDb = client.db(DB_NAME);
            let _sets = myDb.collection(PRODUCT_DB_CONLLECT);
            // 联表查询，发送数据
            _sets.aggregate([
                {
                    $lookup:{
                        localField:'token',
                        from:'goods_a',
                        foreignField:'token',
                        as:'product_a'
                    }
                },
                {
                    $lookup:{
                        localField:'token',
                        from:'goods_b',
                        foreignField:'token',
                        as:'product_b'
                    }
                },
                {
                    $lookup:{
                        localField:'token',
                        from:'goods_c',
                        foreignField:'token',
                        as:'product_c'
                    }
                }
            ]).toArray(function(err,result) {
                if(err) throw err;
                // 关闭连接
                client.close();
                // 返回结果
                resolve(result);
            });
        });
    });
}

// 获得指定商品
let getOneProduct = (obj) =>{
    if (!obj.collection && !obj.goods_id) {
        let err = new Error('必须传入集合名 和 id')
        throw err;
    }
    
    // 生成对象字符串
    let _id = ObjectID.createFromHexString(obj.goods_id);
    return new Promise((resolve, reject) => {
        // 连接数据库
        MongoClient.connect(DB_CONN_STR, { useUnifiedTopology: true }, function (err, client) {
            if (err) throw err;
            let db = client.db(DB_NAME);
            let sets = db.collection(obj.collection);
            sets.findOne({ _id }, function (err, result) {
                if (err) throw err;
                // 成功则返回结果
                resolve(result);
                // 关闭数据库连接
                client.close();
            })
        })
    })

    
}

// 获得集合内所有商品
let getCollectionGoods = (obj) =>{
    if (!obj.collection ) {
        let err = new Error('必须传入集合名')
        return Promise.reject(err)
    }
    return new Promise((resolve, reject) => {
        // 连接数据库
        MongoClient.connect(DB_CONN_STR, { useUnifiedTopology: true }, function (err, client) {
            if (err) throw err;
            let db = client.db(DB_NAME);
            let sets = db.collection(obj.collection);
            sets.find().toArray(function (err, result) {
                if (err) throw err;
                // 成功则返回结果
                resolve(result);
                // 关闭数据库连接
                client.close();
            })
        })
    });
}

// 获得集合中指定页码商品
let getPagesData = (obj)=>{
    if (!obj.collection ) {
        let err = new Error('必须传入集合名')
        return Promise.reject(err)
    }
    let { collection, page, pageSize } = obj
    
    // 跳过的文档数 页码从1开始
    let skipDoc = (page-1) * pageSize;
    // http是字符串，转为数字
    pageSize = parseInt(pageSize);
    return new Promise((resolve, reject) => {
        // 连接数据库
        MongoClient.connect(DB_CONN_STR, { useUnifiedTopology: true }, function (err, client) {
            if (err) throw err;
            let db = client.db(DB_NAME);
            let sets = db.collection(collection);
            // 限制数量 跳过指定文档数
            sets.find().limit(pageSize).skip(skipDoc).toArray(function (err, result) {
                if (err) throw err;
                // 成功则返回结果
                resolve(result);
                // 关闭数据库连接
                client.close();
            })
        })
    });
}

module.exports = {
    addProData,
    getGoodsData,
    getOneProduct,
    getCollectionGoods,
    getPagesData,
    addSortData
};