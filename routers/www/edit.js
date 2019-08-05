
const Router= require('koa-router')
let router=new Router()

router.get('/:id',ctx=>{
    let {id}=ctx.params
    ctx.body=`edit ${id}`
})


module.exports=router.routes()
