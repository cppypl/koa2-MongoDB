const Router = require('koa-router')

let router= new Router()
let ObjectId = require('mongodb').ObjectID;

// router.get('/login',async ctx=>{
    
//     await ctx.render('admin/login',{
//         err:ctx.query.err
//     })
// })


// 接口
router.post('/api_login',async ctx=>{
    let {username,password}=ctx.request.fields
    
    let res=await ctx.db.col('users').find({"username":username}).toArray()
    console.log(res);
    if(!res.length){
        // ctx.redirect(`/admin/login?err=${encodeURIComponent('没有此账户')}`)
        ctx.body={code:1,msg:'没有此账户',}
        
    }else{
        if(res[0].password!=password){
            ctx.body={code:1,msg:'用户名或密码错误'}
            // ctx.redirect(`/admin/login?err=${encodeURIComponent('用户名或密码错误')}`)
            
        }else{
            ctx.session['user']=res[0]
            ctx.body={code:0,msg:'登录成功',res:res[0]}
            // ctx.redirect('/admin')
        }
    }
})
//获取详情
router.get('/getDetail',async ctx=>{
    let {id}= ctx.query
    
    if(id){
        let res=await ctx.db.col('list').findOne({'_id':ObjectId(id)})

        ctx.body=res
        
    }
    // let {username,password}=ctx.request.fields
    
    // let res=await ctx.db.col('users').find({"username":username}).toArray()
    // console.log(res);
    // if(!res.length){
    //     // ctx.redirect(`/admin/login?err=${encodeURIComponent('没有此账户')}`)
    //     ctx.body={code:1,msg:'没有此账户',}
        
    // }else{
    //     if(res[0].password!=password){
    //         ctx.body={code:1,msg:'用户名或密码错误'}
    //         // ctx.redirect(`/admin/login?err=${encodeURIComponent('用户名或密码错误')}`)
            
    //     }else{
    //         ctx.session['user']=res[0]
    //         ctx.body={code:0,msg:'登录成功',res:res[0]}
    //         // ctx.redirect('/admin')
    //     }
    // }
})

// 获取列表
router.get('/api_blogList', async ctx=>{
    let res=await ctx.db.col('list').find().toArray()
    
    ctx.body=res
})
// 添加博客
router.post('/api_addBlog', async ctx=>{

    let {title,content,type}=ctx.request.fields
    let res=await ctx.db.col('list').insertOne({
        title,
        content,
        type,
        time:new Date().getTime()
    })
    console.log(res.result);
    if(res.result.ok){
        ctx.body={code:0,msg:"添加成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
    
    
})
// 修改博客
router.post('/api_editBlog', async ctx=>{

    let {id,title,content,type}=ctx.request.fields
    let res=await ctx.db.col('list').update({'_id':ObjectId(id)},{
        title,
        content,
        type,
        time:new Date().getTime()
    })
    console.log(res.result);
    if(res.result.ok){
        ctx.body={code:0,msg:"修改成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
    
    
})

//获取分类列表
router.get('/api_getType', async ctx=>{

    let res =await ctx.db.col('type').find().toArray()

    console.log(res);
    ctx.body=res
    

})

//添加分类
router.get('/api_addType', async ctx=>{
    let {name}=ctx.query
    let res =await ctx.db.col('type').insertOne({name})

    console.log(res);
    if(res.result.ok){
        ctx.body={code:0,msg:"添加成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
})

//修改分类
router.post('/api_editType', async ctx=>{
    let {id,name}=ctx.request.fields
    let res =await ctx.db.col('type').update({'_id':ObjectId(id)},{name})

    console.log(res);
    if(res.result.ok){
        ctx.body={code:0,msg:"修改成功"}
    }else{
        ctx.throw(500,"添加失败")
    }
})
//获取分类
router.get('/api_getTypeDetail', async ctx=>{
    let {id}=ctx.query
    let res =await ctx.db.col('type').findOne({'_id':ObjectId(id)})

    console.log(res);
    if(res){
        ctx.body=res
    }else{
        ctx.body={code:1,msg:"没有找到"}
    }
})

// router.all('*',async (ctx,next)=>{
//     console.log("**********");
    
//     if(ctx.session['user']){
//         await next()
//     }else{
//         ctx.redirect('/admin/login')
//     }
// })
// router.get('/articleList',async ctx=>{
    
//     await ctx.render('admin/articleList')
// })
// router.get('/',async ctx=>{

//         let res = await ctx.db.col('users').find().toArray()
    
//         await ctx.render('admin/index',{
//             arr:res
//         })
   
    
// })





// router.use('/admin',require('./admin'))
// router.use('/vip',require('./vip'))


module.exports=router.routes()