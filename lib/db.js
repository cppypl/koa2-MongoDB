const MongoClient = require('mongodb').MongoClient;



class Db {
    constructor(){
        MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true },(err,client)=>{
                console.log('连接数据库成功');
                this.db=client.db('201984')
        })
        
      
    }

    col(colName){
        return this.db.collection(colName)
    }
    // find(collection,json){
    //     return new Promise((resolve,reject)=>{

    //         // this.connect().then(db=>{
    //             this.db.collection(collection).find(json).toArray((err,data)=>{
    //                 if(err)  reject(err)
    //                 resolve( data);
    //             })
    //         // })
    //         })
        
    // }
    // updateOne(collection,whereStr,json){
    //     return new Promise((resolve,reject)=>{
    //         // this.connect().then(db=>{
    //             this.db.collection(collection).updateOne(whereStr,json,(err,data)=>{
                    
    //                 if(err) reject(err)
    //                 console.log('修改成功');
                    
    //                 resolve(data)
    //             })
    //         // })
    //     })
    // }
    // updateMany(collection,whereStr,json){
    //     return new Promise((resolve,reject)=>{
    //             this.db.collection(collection).updateMany(whereStr,json,(err,data)=>{
                    
    //                 if(err) reject(err)
    //                 console.log('修改成功');
                    
    //                 resolve(data)
    //             })
    //     })
    // }
    // insert(collection,json){
    //     return  new Promise((resolve,reject)=>{

    //         this.db.collection(collection).insert(json,(err,data)=>{
                
    //             if(err) reject(err)
    //             console.log('插入成功');
                
    //             resolve(data)

    //         })

    //     })
    // }
}


module.exports = new Db()

// let db=new Db()
// console.time(1)

// db.find('users',{}).then(res=>{
//     console.log(res);
//     console.timeEnd(1)
// })

// let res1=await db.updateMany('users',{'name':'徐景羽'},{$set:{'age':'20','sex':'women1'}})
// console.log(res1);



// console.time('kaishi')
// MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, function(err, client) {
//   if (err) throw err;
//   console.log("数据库已创建!");
//   var db = client.db("201984");
//     // dbase.createCollection('site', function (err, res) {
//     //     if (err) throw err;
//     //     console.log("创建集合!");
//     //     client.close();
//     // });

//     // db.collection("users").insertOne({
//     //     name:'彭磊',
//     //     age:28,
//     //     isAdmin:true
//     // },(err)=>{
//     //     if(err) throw err

//     //     console.log('插入数据成功')
//     //     console.timeEnd('kaishi')
//     // })
//     // db.collection('users').find({}).toArray(function(err, result) {
//     //     if (err) throw err;
//     //     console.log(result);
//     //     client.close();
//     // });
//     var whereStr = {"name":'彭磊'}; 
//     var updateStr = {$set: { "age" : "88" ,"isAdmin" : "false" }}; 
    
    
//         // var whereStr = {"name":'penglei'};  // 查询条件
//         // db.collection("users").deleteOne(whereStr, function(err, obj) {
//         //     if (err) throw err;
//         //     console.log("文档删除成功");
//         //     client.close();
//         // });
// });
