const Router = require('koa-router')

let router= new Router()


router.get('/login',async ctx=>{
    
    await ctx.render('admin/login',{
        err:ctx.query.err
    })
})


// 接口
router.post('/login',async ctx=>{
    let {user,pass}=ctx.request.fields
    
    let res=await ctx.db.col('users').find({"username":user}).toArray()
    console.log(res);
    if(!res.length){
        ctx.redirect(`/admin/login?err=${encodeURIComponent('没有此账户')}`)
        
    }else{
        if(res[0].password!=pass){
            ctx.redirect(`/admin/login?err=${encodeURIComponent('用户名或密码错误')}`)
            
        }else{
            ctx.session['user']=user
            ctx.redirect('/admin')
        }
    }
})


router.all('*',async (ctx,next)=>{
    if(ctx.session['user']){
        await next()
    }else{
        ctx.redirect('/admin/login')
    }
})
router.get('/articleList',async ctx=>{
    
    await ctx.render('admin/articleList')
})
router.get('/',async ctx=>{

        let res = await ctx.db.col('users').find().toArray()
    
        await ctx.render('admin/index',{
            arr:res
        })
   
    
})





// router.use('/admin',require('./admin'))
// router.use('/vip',require('./vip'))


module.exports=router.routes()