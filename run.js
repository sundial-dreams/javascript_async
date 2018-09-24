function run(gen){
    let g = gen();
    function next(data){
        let result = g.next(data);
        let {value,done} = result;
        if(done) return value;
        if (Array.isArray(value)) value =  Promise.all(value);
        if(!value instanceof Promise) throw new Error();
        value.then((data) => {
            next(data);
        });
    }
    next();
}

(module)&&(module.exports)&&(module.exports = run);