function promisify(fn_callback) { //接收一个有回调函数的函数,回调函数一般在最后一个参数
    if(typeof fn_callback !== 'function') throw new Error('The argument must be of type Function.');
    return function (...args) {//返回一个函数
      return new Promise((resolve, reject) => {//返回Promise对象
        try {
          if(args.length > fn_callback.length) reject(new Error('arguments too much.'));
          fn_callback.call(this,...args,function (...args) {
            args[0] && args[0] instanceof Error && reject(args[0]);//nodejs的回调，第一个参数为err, Error对象
            args = args.filter(v => v !== undefined && v !== null);//除去undefined,null参数
            resolve(args)
          }.bind(this));//保证this还是原来的this
        } catch (e) {
          reject(e)
        }
      })
    }
  }
  (module)&&(module.exports)&&(module.exports = promisify)