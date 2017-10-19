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
export const urgencyPersonApi = async ({user_id, session_id, language = 'CN', company_code = '', empn_no = '', enable_ta = '', staff_no = ''}) => {
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
 * 获取联系人列表接口
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
        const url = `${BASE_URL}/intest/api/emergencycontact/list`;
        const params = {
            user_id:user_id?user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no, language
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
                                           approver_id,
                                           user_id
                                       }) => {
    try {
        const url = `${BASE_URL}/intest/api/personaldata/submit`;
        const params = {
            user_id: user_id?user_id:staff_no,
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
export const saveSelfAddressApi = async ({user_id, session_id, company_code, empn_no, enable_ta, staff_no, language='CN', reg_province_code, reg_city_code, reg_city_district_code, reg_address, con_province_code, con_city_code, con_city_district_code, con_address, approver_id}) => {
    try {
        const url = `${BASE_URL}/intest/api/address/submit`;
        const params = {
            user_id: user_id? user_id:staff_no,
            session_id, company_code, empn_no, enable_ta, staff_no,language,
            reg_province_code,
            reg_city_code,
            reg_city_district_code,
            reg_address,
            con_province_code,
            con_city_code,
            con_city_district_code,
            con_address,
            approver_id
        }
        return await post({url, params});
    } catch (error) {

    }
}

/**
 * 获取联系人关系类型接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const relationShipTypeApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/emergencycontact/type`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 取消保存个人信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const cancelPersonalApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/personaldata/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 取消修改个人地址信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const cancelSaveAddressApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/address/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 新增联系人接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param relate_type
 * @param chinese_name
 * @param contact_no
 * @param prc_age
 * @param prc_work_unit
 * @param remark
 * @param approver_id
 * @param is_save
 * @returns {Promise.<*>}
 */
export const addRelationApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN',
                                         relate_type,
                                         chinese_name,
                                         contact_no,
                                         prc_age,
                                         prc_work_unit,
                                         remark,
                                         approver_id,
                                         is_save}) => {
    const url = `${BASE_URL}/intest/api/emergencycontact/add`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
        relate_type,
        chinese_name,
        contact_no,
        prc_age,
        prc_work_unit,
        remark,
        approver_id,
        is_save,
    }
    return await post({url, params});
}

/**
 * 保存联系人接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param relate_type
 * @param chinese_name
 * @param contact_no
 * @param prc_age
 * @param prc_work_unit
 * @param remark
 * @param approver_id
 * @param is_save
 * @returns {Promise.<*>}
 */
export const saveRelationApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN',
                                          relationship_tbl_id,
                                          relationship_tbl_approve_id,
                                         relate_type,
                                         chinese_name,
                                         contact_no,
                                         prc_age,
                                         prc_work_unit,
                                         remark,
                                         approver_id,
                                         is_save}) => {
    const url = `${BASE_URL}/intest/api/emergencycontact/submit`;
    const params = {
        user_id: user_id?user_id:staff_no,
        relationship_tbl_id,
        relationship_tbl_approve_id,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
        relate_type,
        chinese_name,
        contact_no,
        prc_age,
        prc_work_unit,
        remark,
        approver_id,
        is_save,
    }
    return await post({url, params});
}

/**
 * 获取证件接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const getIdentityApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no}) => {
    const url = `${BASE_URL}/intest/api/identity/info`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language
    }
    return await post({url, params});
}

/**
 * 完善提交证件接口（Submit）
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param id_no
 * @param coss_no
 * @param housing_fund_no
 * @param approver_id
 * @param remark
 * @returns {Promise.<*>}
 */
export const saveIdentityApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no,
                                          id_no,
                                          coss_no,
                                          housing_fund_no,
                                          approver_id,
                                          remark}) => {
    const url = `${BASE_URL}/intest/api/identity/submit`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        id_no,
        coss_no,
        housing_fund_no,
        approver_id,
        remark
    }
    return await post({url, params});
}

/**
 * 获取银行列表
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const getBankListApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/bankaccount/banklist`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 完善提交工资账号接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param bank_code
 * @param prc_branch
 * @param bank_account_id
 * @param payee_name
 * @param attachment
 * @param remark
 * @param approver_id
 * @returns {Promise.<*>}
 */
export const saveBankInfoApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN', bank_code, prc_branch, bank_account_id, payee_name, attachment, remark, approver_id}) => {
    const url = `${BASE_URL}/intest/api/bankaccount/submit`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
        bank_code, prc_branch, bank_account_id, payee_name, attachment, remark, approver_id
    }
    return await post({url, params});
}

/**
 * 获取工作经历列表
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const getWorkListApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no}) => {
    const url = `${BASE_URL}/intest/api/experience/list`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language
    }
    return await post({url, params});
}

/**
 * 新增工作经历接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param bgn_date
 * @param end_date
 * @param pri_country_code
 * @param pri_comp
 * @param pri_position
 * @param department
 * @param pri_contact_person
 * @param pri_contact_no
 * @param exp_remark
 * @param approver_id
 * @param remark
 * @param is_save
 * @returns {Promise.<*>}
 */
export const addExperienceApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no,
                                           bgn_date,
                                           end_date,
                                           pri_country_code,
                                           pri_comp,
                                           pri_position,
                                           department,
                                           pri_contact_person,
                                           pri_contact_no,
                                           exp_remark,
                                           approver_id,
                                           remark,
                                           is_save}) => {
    const url = `${BASE_URL}/intest/api/experience/add`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        bgn_date,
        end_date,
        pri_country_code,
        pri_comp,
        pri_position,
        department,
        pri_contact_person,
        pri_contact_no,
        exp_remark,
        approver_id,
        remark,
        is_save
    }
    return await post({url, params});
}

export const changeExperienceApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no,
                                           bgn_date,
                                           end_date,
                                           pri_country_code,
                                           pri_comp,
                                           pri_position,
                                           department,
                                           pri_contact_person,
                                           pri_contact_no,
                                           exp_remark,
                                           approver_id,
                                           remark,
                                           is_save,
                                           experience_tbl_approve_id,
                                           experience_tbl_id}) => {
    const url = `${BASE_URL}/intest/api/experience/add`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        bgn_date,
        end_date,
        pri_country_code,
        pri_comp,
        pri_position,
        department,
        pri_contact_person,
        pri_contact_no,
        exp_remark,
        approver_id,
        remark,
        is_save,
        experience_tbl_approve_id,
        experience_tbl_id
    }
    return await post({url, params});
}

/**
 * 获取教育经历列表接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const getEduListApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no}) => {
    const url = `${BASE_URL}/intest/api/education/list`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language
    }
    return await post({url, params});
}

/**
 * 获取联系人接口(单个)
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param relationship_tbl_id
 * @param relationship_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const getSimplePersonApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no, relationship_tbl_id, relationship_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/emergencycontact/info`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        relationship_tbl_id,
        relationship_tbl_approve_id,
    }
    return await post({url, params});
}

/**
 * 取消保存联系人信息
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param relationship_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const cancelChangeRelationApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no, relationship_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/emergencycontact/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        relationship_tbl_approve_id,
    }
    return await post({url, params});
}

/**
 * 取消保存证件信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const cancelSaveCredentialApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/identity/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 取消保存银行卡信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const cancelSaveCardApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/bankaccount/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 获取单条工作经历
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param experience_tbl_id
 * @param experience_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const getSimpleWorkApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no, experience_tbl_id, experience_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/experience/info`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        experience_tbl_id,
        experience_tbl_approve_id,
    }
    return await post({url, params});
}

/**
 * 取消提交保存单条工作信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param experience_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const cancelSaveWorkApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN', experience_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/experience/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
        experience_tbl_approve_id,
    }
    return await post({url, params});
}

/**
 * 获取单条教育经历信息
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param education_tbl_id
 * @param education_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const getSimpleEduApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no, education_tbl_id, education_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/education/info`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        education_tbl_id,
        education_tbl_approve_id,
    }
    return await post({url, params});
}

/**
 * 编辑教育经历接口
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param edu_type
 * @param from_year
 * @param to_year
 * @param country_code
 * @param institude_name
 * @param course
 * @param comment
 * @param cert_filename
 * @param approver_id
 * @param remark
 * @param is_save
 * @param education_tbl_id
 * @param education_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const changeEduExpApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no,
                                          edu_type,
                                          from_year,
                                          to_year,
                                          country_code,
                                          institude_name,
                                          course,
                                          comment,
                                          cert_filename,
                                          approver_id,
                                          remark,
                                          is_save,
                                          education_tbl_id,
                                          education_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/education/submit`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        edu_type,
        from_year,
        to_year,
        country_code,
        institude_name,
        course,
        comment,
        cert_filename,
        approver_id,
        remark,
        is_save,
        education_tbl_id,
        education_tbl_approve_id
    }
    console.log('编辑教育经历')
    console.log(params)
    return await post({url, params});
}

/**
 * 添加教育经历
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param edu_type
 * @param from_year
 * @param to_year
 * @param country_code
 * @param institude_name
 * @param course
 * @param comment
 * @param cert_filename
 * @param approver_id
 * @param remark
 * @param is_save
 * @returns {Promise.<*>}
 */
export const addEduExpApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no,
                                          edu_type,
                                          from_year,
                                          to_year,
                                          country_code,
                                          institude_name,
                                          course,
                                          comment,
                                          cert_filename,
                                          approver_id,
                                          remark,
                                          is_save}) => {
    const url = `${BASE_URL}/intest/api/education/add`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language,
        edu_type,
        from_year,
        to_year,
        country_code,
        institude_name,
        course,
        comment,
        cert_filename,
        approver_id,
        remark,
        is_save,
    }
    return await post({url, params});
}

/**
 * 获取教育类型接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const getEducationTypeListApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/education/type`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}

/**
 * 取消单个提交教育经历接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @param education_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const cancelSaveEducationApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN', education_tbl_approve_id}) => {
    const url = `${BASE_URL}/intest/api/education/cancel`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
        education_tbl_approve_id
    }
    return await post({url, params});
}

/**
 * 获取证件信息列表
 * @param user_id
 * @param session_id
 * @param language
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const geCertListApi = async ({user_id, session_id, language = 'CN', company_code, empn_no, enable_ta, staff_no}) => {
    const url = `${BASE_URL}/intest/api/certificate/list`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id, company_code, empn_no, enable_ta, staff_no, language
    }
    return await post({url, params});
}

/**
 * 获取证件类型接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param language
 * @returns {Promise.<*>}
 */
export const getCertTypeListApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN'}) => {
    const url = `${BASE_URL}/intest/api/certificate/type`;
    const params = {
        user_id: user_id?user_id:staff_no,
        session_id,
        company_code,
        empn_no,
        enable_ta,
        staff_no,
        language,
    }
    return await post({url, params});
}