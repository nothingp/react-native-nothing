// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';

import {
    linkcheckApi,
    taskListApi,
    sysfunctionmenuListApi,
} from '../services/trueService'
//页面提醒
import { Toast } from 'antd-mobile';

import Base from './Base'

//页面跳转

class User {
    @observable linkCheckData = ''; // 检查link数据返回
    @observable taskListData = ''; // 获取待处理、已处理任务列表
    @observable sysfunctionmenuListData = ''; // 获取 ESS PRC 功能权限接口

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
    taskListAction = async (status) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await taskListApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            status,
        });
        runInAction(() => {
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

}

export default new User();