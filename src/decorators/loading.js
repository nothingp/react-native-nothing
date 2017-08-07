import { Toast} from 'antd-mobile';

export default function loading (target, name, descriptor){
    const method = descriptor.value;
    descriptor.value = (...args)=>{
        Toast.loading("loading...",0);
        let ret = method.apply(target, args);
        Toast.hide();
        return ret;
    }
    return descriptor;
}