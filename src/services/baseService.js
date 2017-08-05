import {post} from '../util/HttpTool'
import {BASE_URL} from '../common/GlobalContants'

export async function loginApi(acount,passwd) {
    // const url = `${BASE_URL}/weixin/oauth/getUser`;
    // const params = {
    //     openId
    // }
    // return await post({url, params}).then(res => res.json());
    //sleep(3000);
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
