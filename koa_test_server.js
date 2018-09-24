const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const api = new Router();
api.get('/api/test1', async ctx => { //处理get请求
  ctx.res.setHeader('Access-Control-Allow-Origin', '*');
  let querystring = ctx.querystring;
  console.log(querystring);
  ctx.body = JSON.stringify({
    errno: false,
    data: 'it is ok',
    message: `you send me ${querystring} type is GET`
  });
}).post('/api/test2', async ctx => {//处理post请求
  ctx.res.setHeader('Access-Control-Allow-Origin', '*');
  let data = ctx.request.body;
  console.log(data);
  ctx.body = JSON.stringify({
    errno: false,
    data: 'it is ok',
    message: `you send me ${JSON.stringify(data)} type is POST`
  })
});
app.use(bodyparser());
app.use(api.routes()).use(api.allowedMethods());
app.listen(3000, () => {
  console.log('listen in port 3000')
});
