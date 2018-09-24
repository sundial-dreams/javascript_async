function spawn(genF){
    return new Promise((resolve,reject) => {
        let g = genf();
        function next(nextF){
            let next;
            try{
                next = nextF();
            }catch(e){
                reject(e)
            }
            if(next.done) return resolve(next.value);
            Promise.resolve(next.value)
                   .then(data => next(() => g.next(data)))
                   .catch(err => next(() => g.throw(err)));
        }
        next(() => g.next(undefined))
    })
}
(module)&&(module.exports)&&(module.exports = spawn)