import { Toast} from 'antd-mobile';

export const loading = (target, name, descriptor) =>{
    Toast.loading('Loading...', 0);
    return (target, name, descriptor) => {
        const method = descriptor.value;
        descriptor.value =  (...args) => {
            let ret = method.apply(target, args);
            Toast.hide();
            return ret;
        }
    }
}