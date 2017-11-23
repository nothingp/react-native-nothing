import { post,postJson } from '../util/HttpTool';
import { BASE_URL } from '../common/GlobalContants';

/**
 * 76.链接检查接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const linkcheckApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN' }) => {
    try {
        const url = `/intest/api/linkcheck`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            language,
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 70.获取待处理、已处理任务列表
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param status PE(Pending) | PD(Processed)
 * @param function (ALL | PP | LA | CA | TS | LC | CL)
 * @returns {Promise.<*>}
 */
export const taskListApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, func_id = 'ALL', status = 'PE', page_index = 1, page_size = 10, language = 'CN' }) => {
    try {
        const url = `/intest/api/task/list`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            language,
            func_id,
            status,
            page_index,
            page_size,
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 82.获取 ESS PRC 功能权限接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const sysfunctionmenuListApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, language = 'CN' }) => {
    try {
        const url = `/intest/api/sysfunctionmenu/list`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            language,
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 13.获取个人资料接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param person_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const personaldataDetailApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, person_tbl_approve_id, language = 'CN' }) => {
    try {
        const url = `/intest/api/personaldata/detail`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            person_tbl_approve_id,
            language,
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 71.提交审批信息
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const taskSubmitApi = async (data) => {
    try {
        const url = `/intest/api/task/submit`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 73.提交消息已读接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param alert_tbl_id
 * @returns {Promise.<*>}
 */
export const alertsSubmitApi = async (data) => {
    try {
        const url = `/intest/api/alerts/submit`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 23.获取联系人接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param relationship_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const emergencycontactDetailApi = async (data) => {
    try {
        const url = `/intest/api/emergencycontact/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 17.获取家庭地址信息接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param address_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const addressDetailApi = async (data) => {
    try {
        const url = `/intest/api/address/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 43.获取教育经历接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param education_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const educationDetailApi = async (data) => {
    try {
        const url = `/intest/api/education/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 39.获取教育类型接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const educationTypeApi = async (data) => {
    try {
        const url = `/intest/api/education/type`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 27.获取证件接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param id_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const identityDetailApi = async (data) => {
    try {
        const url = `/intest/api/identity/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 31.获取工资账号接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param net_pay_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const bankaccountDetailApi = async (data) => {
    try {
        const url = `/intest/api/bankaccount/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 49.获取证书接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param license_cert_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const certificateDetailApi = async (data) => {
    try {
        const url = `/intest/api/certificate/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 37.获取工作经历接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param experience_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const experienceDetailApi = async (data) => {
    try {
        const url = `/intest/api/experience/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 54.查看请假信息接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param experience_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const leaveLeaveinfoApi = async (data) => {
    try {
        const url = `/intest/api/leave/leaveinfo`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 61.查看可调休假申报信息接口（TASK）
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param lv_adj_tbl_id
 * @returns {Promise.<*>}
 */
export const leaveawardDetailsApi = async (data) => {
    try {
        const url = `/intest/api/leaveaward/details`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 64.获取报销详细接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param claims_id
 * @returns {Promise.<*>}
 */
export const claimsDetailsApi = async (data) => {
    try {
        const url = `/intest/api/claims/detailsv2`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 89.获取公告列表接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param page_index
 * @param page_size
 * @returns {Promise.<*>}
 */
export const noticeListApi = async (data) => {
    try {
        const url = `/intest/api/notice/list`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 90.获取公告详情接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param alert_tbl_id
 * @returns {Promise.<*>}
 */
export const noticeDetailApi = async (data) => {
    try {
        const url = `/intest/api/notice/detail`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}
/**
 * 56.获取Leave Balance接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const leaveLeavebalanceApi = async (data) => {
    try {
        const url = `/intest/api/leave/leavebalance`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 91.获取员工近期假期接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param begin_time
 * @param end_time
 * @returns {Promise.<*>}
 */
export const leaveRecentLeaveApi = async (data) => {
    try {
        const url = `/intest/api/leave/recentLeave`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

export const approverApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, func_id, func_dtl, key }) => {
    try {
        const url = `/intest/api/approver/list`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id,
            func_dtl,
            key
        }
        return await post({ url, params });
    } catch (error) {

    }
}

export const managerApi = async ({ user_id, session_id, company_code, empn_no, enable_ta, staff_no, func_id, func_dtl, manager_id, key }) => {
    try {
        const url = `/intest/api/manager`;
        const params = {
            user_id,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id,
            func_dtl,
            manager_id,
            key
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 65.获取所有报销Items接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @returns {Promise.<*>}
 */
export const claimsClaimitemsApi = async (data) => {
    try {
        const url = `/intest/api/claims/claimitemsv2`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 75.获取Payslip列表接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 * @param payslip_year
 * @returns {Promise.<*>}
 */
export const payslipApi = async (data) => {
    try {
        const url = `/intest/api/payslip`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 67.提交报销申请接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 *
 * @param month
 * @param remark
 * @param approver_id
 * @param is_save
 * @param claim_id
 * @param data: [
 *                  {
 *                      claim_dtl_id,
 *                      item_code,
 *                      as_of_date,
 *                      unit,
 *                      amount,
 *                      receipt,
 *                      remark
 *                  },...
 *              ]
 *
 * @returns {Promise.<*>}
 */
export const claimsSubmitApi = async (data) => {
    try {
        const url = `/intest/api/claims/submit`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await postJson({ url, params });
    } catch (error) {

    }
}

/**
 * 68.提交报销申请接口(Cancel)
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 *
 * @param claims_id
 * @returns {Promise.<*>}
 */
export const claimsCancelApi = async (data) => {
    try {
        const url = `/intest/api/claims/cancel`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}

/**
 * 69.删除报销接口
 * @param user_id
 * @param session_id
 * @param company_code
 * @param empn_no
 * @param enable_ta
 * @param staff_no
 *
 * @param claims_id
 * @returns {Promise.<*>}
 */
export const claimsRemoveApi = async (data) => {
    try {
        const url = `/intest/api/claims/remove`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}