// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';

import {
    linkcheckApi,
    taskListApi,
    sysfunctionmenuListApi,
    personaldataDetailApi,
    taskSubmitApi,
    alertsSubmitApi,
} from '../services/trueService'
//页面提醒
import { Toast } from 'antd-mobile';

import Base from './Base'

//页面跳转

class User {
    @observable linkCheckData = ''; // 检查link数据返回
    @observable taskListData = ''; // 获取待处理、已处理任务列表
    @observable sysfunctionmenuListData = ''; // 获取 ESS PRC 功能权限接口
    @observable personaldataDetailData = ''; // 获取个人资料接口
    @observable taskSubmitData = '';
    @observable alertsSubmitData = '';

    constructor() {
        autorun(() => {
            if (!Base.userInfo) {
            }
        })
    }

    @action
    linkcheckAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await linkcheckApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail('输入的系统地址无效', 1);
            }
            else {
                Toast.hide();
                this.linkCheckData = data.resultdata;
            }
        });
    }

    @action
    taskListAction = async (func_id, status) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await taskListApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id,
            status,
        });
        runInAction(() => {
            this.taskListData = null;
            if (data.result == "ERR") {
            }
            else {
                Toast.hide();
                this.taskListData = data.resultdata;
            }
        });
    }

    @action
    sysfunctionmenuListAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await sysfunctionmenuListApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        });
        runInAction(() => {
            if (data.result == "ERR") {
            }
            else {
                Toast.hide();
                this.sysfunctionmenuListData = data.resultdata;
            }
        });
    }

    @action
    personaldataDetailApiAction = async (person_tbl_approve_id, img, activeKey, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await personaldataDetailApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            person_tbl_approve_id,
        });
        runInAction(() => {
            if (data.result == "ERR") {
            }
            else {
                Toast.hide();
                this.personaldataDetailData = { ...data.resultdata, img, activeKey, person_tbl_approve_id, };
                cb && cb();
            }
        });
    }

    @action
    taskSubmitApiAction = async (status, func_id = 'PP', func_dtl = 'PD', key, remark, approver_id, cb) => {
        //func_id (PP , TS , LA , CA , LC, CL)
        //func_dtl (PD | AD | EC | BA | leave type)
        //key 数据类型：Int
        //status A | R
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await taskSubmitApi({
            ...sameData,
            approver_id,
            status,
            remark,
            func_id,
            func_dtl,
            key,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.taskSubmitData = { ...data.resultdata };
                cb && cb();
            }
        });
    }

    @action
    alertsSubmitApiAction = async (alert_tbl_id, cb) => {
        //func_id (PP , TS , LA , CA , LC, CL)
        //func_dtl (PD | AD | EC | BA | leave type)
        //key 数据类型：Int
        //status A | R
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await alertsSubmitApi({
            ...sameData,
            alert_tbl_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.alertsSubmitData = { ...data.resultdata };
                cb && cb();
            }
        });
    }

}

export default new User();