export default function log (target, name, descriptor){
    const method = descriptor.value;
    descriptor.value = (...args)=>{
        console.log(`(before function execute: ${name}(${args}) = ?`);
        let ret;
        try {
            ret = method.apply(target, args);
            console.log(`(after function execute success: ${name}(${args}) => ${ret}`);
        } catch (error) {
            console.error(`(function execute error: ${name}(${args}) => ${error}`);
        }
        return ret;
    }
    return descriptor;
}