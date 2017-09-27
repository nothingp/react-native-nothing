import { post } from '../util/HttpTool';
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
        const url = `${BASE_URL}/intest/api/linkcheck`;
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
        const url = `${BASE_URL}/intest/api/task/list`;
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
        const url = `${BASE_URL}/intest/api/sysfunctionmenu/list`;
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
        const url = `${BASE_URL}/intest/api/personaldata/detail`;
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
 * @param person_tbl_approve_id
 * @returns {Promise.<*>}
 */
export const taskSubmitApi = async (data) => {
    try {
        const url = `${BASE_URL}/intest/api/task/submit`;
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
        const url = `${BASE_URL}/intest/api/alerts/submit`;
        const language = 'CN';
        const params = {
            ...data,
            language
        }
        return await post({ url, params });
    } catch (error) {

    }
}