import {post} from '../util/HttpTool'
import {BASE_URL} from '../common/GlobalContants'

export async function loginApi(username,password,language='CN',registration_id) {
    const url = `${BASE_URL}/intest/api/login`;
    const params = {
        username,password,language,registration_id
    }
    return await post({url, params}).then(res => res.json());
}
