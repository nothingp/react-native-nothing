import { post } from '../util/HttpTool'
import { BASE_URL } from '../common/GlobalContants'

export async function loginApi(username, password, language = 'CN', registration_id) {
    const url = `${BASE_URL}/intest/api/login`;
    const params = {
        username, password, language, registration_id
    }
    return await post({ url, params }).then(res =>  res.json());
}

export async function alertsListApi(user_id, session_id) {
    const url = `${BASE_URL}/intest/api/alerts/list`;
    const params = {
        user_id, session_id
    }
    return await post({ url, params }).then(res => res.json());
}

export async function resetPwdApi(user_id, session_id, old_password, new_password) {
    const url = `${BASE_URL}/intest/api/resetpwd`;
    const params = {
        user_id, session_id
    }
    return await post({ url, params }).then(res => res.json());
}

export async function personalDataApi({user_id, session_id, company_code, empn_no, enable_ta, staff_no}) {
    const url = `${BASE_URL}/intest/api/personaldata/info`;
    const params = {
        user_id, session_id, company_code, empn_no, enable_ta, staff_no
    }
    console.log(params)
    return await post({ url, params }).then(res => res.json());
}

/**
 * 更新基础数据接口
 * @param user_id req
 * @param session_id req
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const basisDataApi = async ({user_id, session_id, company_code='', empn_no='', enable_ta='', staff_no=''}) => {
    try{
        const url = `${BASE_URL}/intest/api/basisdata`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no
        }
        console.log(params)
        return await post({ url, params }).then(res => res.json());
    } catch(error){

    }
}