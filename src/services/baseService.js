import {post} from '../util/HttpTool'
import {BASE_URL} from '../common/GlobalContants'

export const login = async (openId) => {
    const url = `${BASE_URL}/weixin/oauth/getUser`;
    const params = {
        openId
    }
    return await post({url, params}).then(res => res.json());
}