const koa = require('koa')
const Router = require('koa-router')
const koaStatic=require('koa-static')
const path=require('path')
const body=require('koa-better-body')
const koaSession= require('koa-session')
const ejs= require('koa-ejs')
const cors= require('koa-cors')

let app=new koa()
app.listen(8000)
console.log('服务运行在8000端口')




// 数据库
app.context.db=require('./lib/db')
// 中间件
ejs(app,{
    root:"./template",
    layout:false,//自己又加了一层，咱不需要
    viewExt:"html",//扩展名
    cache:false,//上线后改成true，有缓存

})
app.use(body({
    uploadDir:'./upload'
}))
app.use(cors())
// session
app.keys=['QWERTYUIOPAasdfghjkl:"zxcvbnm<>?','asdfghjkl741852963/8*-:','！@#￥%……&*（）——WSDRFTGYHUJIKL']//越多越好
app.use(koaSession({
    maxAge:20*60*1000, //有效期
    renew:true,//自动续期
},app))
// app.use(async ctx=>{
//     if(!ctx.session.view){
//         ctx.session.view=0
//       }
//       ctx.session.view++

// })



// // 统一处理
// app.use(async (ctx,next)=>{
//     try {
//         await next()
//     } catch (error) {
//         console.log(error);
        
//         ctx.response.status=500;
//         ctx.body="500错误，请联系管理员"
//     }
//     // ctx.response.status=404;
//     // ctx.response.set({'a':123,'b':'bbb'})
//     // ctx.response.body='404'
// })



// 路由
let router=new Router()

router.use('/admin',require('./routers/admin'))
router.use('',require('./routers/www'))
app.use(router.routes())

// 静态文件
app.use(koaStatic(path.resolve('static')),{
    maxAge:3600*24*1000
})
