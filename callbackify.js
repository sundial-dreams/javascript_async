function callbackify(fn_promise) {
    if(typeof fn_promise !== 'function') throw new Error('The argument must be of type Function.');
    return function (...args) {
      let callback = args.pop();//返回一个函数 最后一个参数是回调
      if(typeof callback !== 'function') throw new Error('The last argument must be of type Function.');
      if(fn_promise() instanceof Promise){
        fn_promise(args).then(data => {
          callback(null,data)//回调执行
        }).catch(err => {
          callback(err,null)//回调执行
        })
      }else{
        throw new Error('function must be return a Promise object');
      }
    }
  }
  (module)&&(module.exports)&&(module.exports = callbackify)