// mongoDB
let { MongoClient, ObjectID } = require("mongodb");

const { DB_CONN_STR, DB_NAME, USER_DB_CONLLECT, CODE } = require('./config');

// 添加用户
let addUserInfo = (insertData) => {
    return new Promise((resolve,reject)=>{
        // 链接数据库客户端
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology: true},function(err,client) {
            // 数据库连接失败
            if(err) reject("连接数据库失败~！");
            let db = client.db(DB_NAME);
            let sets = db.collection(USER_DB_CONLLECT);
            // 插入数据
            sets.insertOne(insertData,function(err,result) {
                // 关闭客户端
                client.close();
                if (err) {
                    client.close();
                    reject("插入数据失败");
                };
                resolve("插入数据成功");
            });
        })
    })
}

// 查询并且注册用户
let registerUser = (obj) => {
    return new Promise((resolve,reject)=>{
        // connect连接
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology: true},function(error,client){
            if(error) return reject(error);
            let myDb = client.db(DB_NAME);
            let _sets = myDb.collection(USER_DB_CONLLECT);
            // 查询一条数据 根据用户名
            _sets.findOne({ username: obj.username },function(err,result) {
                if(err) throw err;
                // 关闭客户端
                client.close();
                // 如果存在结果
                if(result){
                    reject({
                        reg_info: '用户名已存在',
                        reg_code: CODE.reg_code2
                    });
                }else{
                    // 用户名不存在可以注册
                    addUserInfo(obj).then(_d=>{
                        resolve({
                            reg_info: '注册成功',
                            reg_code: CODE.reg_code1
                        });
                    }).catch(err=>{
                        // 注册失败
                        reject({
                            reg_info: '连接数据库失败，请重新再试',
                            reg_code: CODE.reg_code3
                        });
                    })
                }
            })
        });
    });
}
// 登录查询 
/**
 * state 
 *      success 登录成功
 *      fail 1、用户名不存在
 *           2、密码错误
 */
let loginQuery = (obj)=>{
    // 返回promise对象
    return new Promise((resolve,reject)=>{
        // 链接数据库
        MongoClient.connect(DB_CONN_STR,{useUnifiedTopology:true},function(err,client) {
            // 如果存在错误
            if(err) reject("连接数据库失败");
            // 链接数据库
            let db = client.db(DB_NAME);
            // 连接集合
            let sets = db.collection(USER_DB_CONLLECT);

            // 查询一条数据
            sets.findOne({
                username: obj.username
            },function(err,result) {
                
                // 查询错误
                if(err) reject(err);

                // 如果结果不存在
                if(!result){
                    resolve({
                        login_info: '用户名不存在',
                        login_code: CODE.login_code2
                    });
                }else if(result.password !== obj.password){ // 如果密码错误
                    resolve({
                        login_info: '密码错误',
                        login_code: CODE.login_code3
                    });
                }
                // 登录成功
                resolve({
                    login_info: result,
                    login_code: CODE.login_code1
                });
                // 关闭客户端连接
                client.close();
            });
        })
    });
}
module.exports = {
    registerUser,
    loginQuery
}