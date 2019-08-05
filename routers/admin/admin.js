const Router= require('koa-router')
let userRouter=new Router()
userRouter.get('/a',ctx=>{
    ctx.body='admin'
})

userRouter.get('/',ctx=>{
    ctx.body='adminIndex'
})




module.exports=userRouter.routes()