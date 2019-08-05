const Router= require('koa-router')
let userRouter=new Router()
userRouter.get('/v',ctx=>{
    ctx.body='vip'
})

userRouter.get('/',ctx=>{
    ctx.body='vipIndex'
})



module.exports=userRouter.routes()