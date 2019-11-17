const Router= require('koa-router')
let router=new Router()

router.get('/',async ctx=>{
    console.time('11');
    
    let data=await ctx.db.col('users').find().toArray()
    console.log(data);
    
    console.timeEnd('11');
    ctx.body="服务端渲染的首页"
})




module.exports=router.routes()