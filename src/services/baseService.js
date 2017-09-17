import {post} from '../util/HttpTool'
import {BASE_URL} from '../common/GlobalContants'


export async function loginApi(username, password, language = 'CN', registration_id) {
    const url = `${BASE_URL}/intest/api/login`;
    const params = {
        username, password, language, registration_id
    }
    return await post({url, params});
}

export async function alertsListApi({user_id, session_id, staff_no, status = 1}) {
    const url = `${BASE_URL}/intest/api/alerts/list`;
    const params = {
        user_id, session_id, status, staff_no
    }
    return await post({url, params});
}

export async function resetPwdApi(user_id, session_id, old_password, new_password) {
    const url = `${BASE_URL}/intest/api/resetpwd`;
    const params = {
        user_id, session_id
    }
    return await post({url, params});
}

export async function sendForgetPwdEmailApi(username) {
    const url = `${BASE_URL}/intest/api/sendforgetpwdemail`;
    const params = {
        username
    }
    return await post({url, params});
}

export async function personalDataApi({user_id, session_id, company_code, language = 'CN', empn_no, enable_ta, staff_no}) {
    const url = `${BASE_URL}/intest/api/personaldata/info`;
    const params = {
        user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
    }
    console.log(params)
    return await post({url, params});
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
export const basisDataApi = async ({user_id, session_id, company_code = '', language = 'CN', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/basisdata`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 获取个人信息（名字， 头像，职位）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>} {"name":"陈大文","user_photo":"","position":"后台开发"}
 */
export const personalInfoApi = async ({user_id, session_id, language = 'CN', company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/personaldata/profile`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
        }
        return await post({url, params});
    } catch (error) {

    }
}

// /intest/api/address/info
/**
 * 获取个人地址接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const addressInfoApi = async ({user_id, session_id, language = 'CN', company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/address/info`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 获取紧急联系人接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const relationShipApi = async ({user_id, session_id, language = 'CN', company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/emergencycontact/info`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 获取支付账户接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const bankAccountApi = async ({user_id, session_id, language = 'CN', company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/bankaccount/info`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language
        }
        return await post({url, params});
    } catch (error) {

    }
}

export const personalPhotoApi = async ({user_id, session_id, user_photo, company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
    try {
        const url = `${BASE_URL}/intest/api/personalphoto`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, user_photo
        }
        return await post({url, params});
    } catch (error) {

    }
}

export const fileUploadApi = async ({user_id, session_id, pic, pic_suffix, file_folder, language = 'CN'}) => {
    try {
        const url = `${BASE_URL}/intest/api/fileupload`;
        const params = {
            user_id, session_id, language, pic, pic_suffix, file_folder
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 获取审批人员接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param module
 * @param key
 * @returns {Promise.<*>}
 */
export const approverApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no, module = '', key=''}) => {
    try {
        const url = `${BASE_URL}/intest/api/approver`;
        const params = {
            user_id, session_id, company_code, empn_no, enable_ta, staff_no, language, module, key
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 保存个人信息
 * @param prc_former_name
 * @param sex
 * @param dob
 * @param prc_np_province_code
 * @param prc_np_city_code
 * @param prc_nationality_code
 * @param prc_political_status
 * @param mobile_no
 * @param office_no
 * @param prc_qq
 * @param home_no
 * @param prc_major
 * @param prc_education
 * @param prc_grade_gettime
 * @param comp_email
 * @param pers_email
 * @param marital_status
 * @param remark
 * @returns {Promise.<*>}
 */
export const submitUserInfoApi = async({ session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN',
                                           prc_former_name,
                                           sex,
                                           dob,
                                           prc_np_province_code,
                                           prc_np_city_code,
                                           prc_nationality_code,
                                           prc_political_status,
                                           mobile_no,
                                           office_no,
                                           prc_qq,
                                           home_no,
                                           prc_major,
                                           prc_education,
                                           prc_grade_gettime,
                                           comp_email,
                                           pers_email,
                                           marital_status,
                                           remark,
                                           approver_id
                                       }) => {
    try {
        const url = `${BASE_URL}/intest/api/personaldata/submit`;
        const params = {
            session_id, company_code, empn_no, enable_ta, staff_no,language,
            prc_former_name,
            sex,
            dob,
            prc_np_province_code,
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            mobile_no,
            office_no,
            prc_qq,
            home_no,
            prc_major,
            prc_education,
            prc_grade_gettime,
            comp_email,
            pers_email,
            marital_status,
            remark,
            approver_id
        }
        return await post({url, params});
    } catch (error) {

    }

}

/**
 * 完善提交家庭地址信息接口
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param reg_province_code
 * @param reg_city_code
 * @param reg_city_district_code
 * @param reg_address
 * @param con_province_code
 * @param con_city_code
 * @param con_city_district_code
 * @param con_address
 * @returns {Promise.<*>}
 */
export const saveSelfAddressApi = async ({session_id, company_code, empn_no, enable_ta, staff_no, language='CN', reg_province_code, reg_city_code, reg_city_district_code, reg_address, con_province_code, con_city_code, con_city_district_code, con_address}) => {
    try {
        const url = `${BASE_URL}/intest/api/address/submit`;
        const params = {
            session_id, company_code, empn_no, enable_ta, staff_no,language,
            reg_province_code,
            reg_city_code,
            reg_city_district_code,
            reg_address,
            con_province_code,
            con_city_code,
            con_city_district_code,
            con_address
        }
        return await post({url, params});
    } catch (error) {

    }
}