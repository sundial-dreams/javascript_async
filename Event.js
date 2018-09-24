//单对象写法 Event 就相当于事件中心
const Event = function () { //使用闭包的好处 : 把EventPool私有化，外界无法访问EventPool
    const EventPool = new Map();//使用es6 map来存 event，callback 键值对
    const isFunction = func => typeof func === 'function';
  
    const on = (event, callback) => { //注册事件
      EventPool.get(event) || EventPool.set(event, []);
      if (isFunction(callback)) {
        EventPool.get(event).push(callback);
      }
      else {
        throw new Error('callback not is function')
      }
    };
    const addEventListenr = (event, callback) => { //on方法别名
      on(event, callback)
    };
    const emit = (event, ...args) => { //触发(发布)事件
      //让事件的触发为一个异步的过程，即排在同步代码后执行
      //也可以setTimeout(fn,0)
      Promise.resolve().then(() => {
        let funcs = EventPool.get(event);
        if (funcs) {
          funcs.forEach(f => f(...args))
        } else {
          throw new Error(`${event} not register`)
        }
      })
    };
    const send = (event, ...args) => {//emit方法别名
      emit(event,...args)
    };
    const removeListener = event => {//删除事件
      Promise.resolve(() => {//删除事件也为异步的过程
        if(event){
          EventPool.delete(event)
        }else{
          throw new Error(`${event} not register`)
        }
      })
    };
  
    return {
      on, emit, addEventListenr, send
    }
  }();
  

  //2
  class EventEmiter{
    constructor() {
      this._EventPool = new Map();
    }
    on(event, callback) {
      this._EventPool.get(event) || this._EventPool.set(event, []);
      if (typeof callback === 'function') {
        this._EventPool.get(event).push(callback);
      }
      else {
        throw new Error('callback not is function')
      }
    }
    addEventListener(event,callback) {
      this.on(event,callback)
    }
    emit(event,...args) {
      Promise.resolve().then(() => {
        let funcs = this._EventPool.get(event);
        if (funcs) {
          funcs.forEach(f => f(...args))
        } else {
          throw new Error(`${event} not register`)
        }
      })
    }
    send(event,...args) {
      this.emit(event,...args)
    }
    removeListener(event) {
      Promise.resolve().then(() => {
        if (event) {
          this._EventPool.delete(event)
        } else {
          throw new Error(`${event} not register`)
        }
      })
    }
  }
  
  (module)&&(module.exports)&&(module.exports = {Event,EventEmiter})