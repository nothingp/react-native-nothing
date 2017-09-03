import { Toast} from 'antd-mobile';

export default function loading (target, name, descriptor){
    const method = descriptor.value;
    descriptor.value = async (...args)=>{
        Toast.loading("loading...",0);
        let ret = await method.apply(target, args);
        Toast.hide();
        return ret;
    }
    return descriptor;
}