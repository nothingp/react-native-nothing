export const log=(type)=>{
    return function(target,name,descriptor){
        console.info(`log ${name}`);
        let src_method=descriptor.value;
        descriptor.value=(...arg)=>{
            src_method.apply(target,arg);
            console.info(`log ${type}`);
        }
    }
}