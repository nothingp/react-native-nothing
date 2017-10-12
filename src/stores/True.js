// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';

import {
    linkcheckApi,
    taskListApi,
    sysfunctionmenuListApi,
    personaldataDetailApi,
    taskSubmitApi,
    alertsSubmitApi,
    emergencycontactDetailApi,
    addressDetailApi,
    educationDetailApi,
    educationTypeApi,
    approverApi,
    managerApi,
    identityDetailApi,
    bankaccountDetailApi,
    certificateDetailApi,
    experienceDetailApi,
} from '../services/trueService'
//页面提醒
import { Toast } from 'antd-mobile';

import Base from './Base'

//页面跳转

class True {
    @observable linkCheckData = ''; // 检查link数据返回
    @observable taskListData = ''; // 获取待处理、已处理任务列表
    @observable sysfunctionmenuListData = ''; // 获取 ESS PRC 功能权限接口
    @observable personaldataDetailData = ''; // 获取个人资料接口
    @observable taskSubmitData = '';
    @observable alertsSubmitData = '';
    @observable emergencycontactDetail = '';
    @observable addressDetailData = '';
    @observable educationDetail = '';
    @observable educationTypeData = '';
    @observable identityDetail = '';
    @observable bankaccountDetail = '';
    @observable certificateDetail = '';
    @observable experienceDetail = '';

    @observable taskSelectType = {
        label: '所有',
        value: 'ALL'
    };  //任务导航头部选中的分类

    @observable activeKey = 'PE';//task处理状态

    @observable selectTask = {};  //选中记录的任务信息
    @observable selectTaskApprovers = []; //选中记录的审批人信息
    @observable selectTaskManagers = []; //选中记录的其他审批人信息

    constructor() {
        autorun(() => {
            if (!Base.userInfo) {
            }

            if (this.selectTask.key) {
                this.approverApiAction();
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
    taskListAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const func_id = this.taskSelectType.value;
        const status = this.activeKey;
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
    personaldataDetailApiAction = async (person_tbl_approve_id, img, name, cb) => {
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
                this.personaldataDetailData = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    person_tbl_approve_id,
                    name
                };
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

    @action
    emergencycontactDetailApiAction = async (relationship_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await emergencycontactDetailApi({
            ...sameData,
            relationship_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.emergencycontactDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: relationship_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    addressDetailApiAction = async (address_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await addressDetailApi({
            ...sameData,
            address_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.addressDetailData = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: address_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    educationDetailApiAction = async (education_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await educationDetailApi({
            ...sameData,
            education_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.educationTypeApiAction();
                this.educationDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: education_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    identityDetailApiAction = async (id_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await identityDetailApi({
            ...sameData,
            id_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.identityDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: id_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    bankaccountDetailApiAction = async (net_pay_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await bankaccountDetailApi({
            ...sameData,
            net_pay_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.bankaccountDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: net_pay_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    certificateDetailApiAction = async (license_cert_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await certificateDetailApi({
            ...sameData,
            license_cert_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.certificateDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: license_cert_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    experienceDetailApiAction = async (experience_tbl_approve_id, img, name, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await experienceDetailApi({
            ...sameData,
            experience_tbl_approve_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.experienceDetail = {
                    ...data.resultdata,
                    img,
                    activeKey: this.activeKey,
                    key: experience_tbl_approve_id,
                    name
                };
                cb && cb();
            }
        });
    }

    @action
    educationTypeApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await educationTypeApi({
            ...sameData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.educationTypeData = { ...data.resultdata };
            }
        });
    }

    @action
    approverApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { func_id, func_dtl, key } = this.selectTask;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id,
            func_dtl,
            key
        }
        const data = await approverApi({
            ...sameData,
        });

        let arr = [];
        //格式化请求回来的数据
        data && data.resultdata && data.resultdata.approvers && data.resultdata.approvers.map(info => {
            //判断是否为默认，若为默认则插入数组最前面
            if (info.is_default == '1') {
                arr.unshift({
                    value: info.approver_id,
                    label: info.approver_name,
                })
            } else {
                arr.push({
                    value: info.approver_id,
                    label: info.approver_name,
                })
            }
        })
        runInAction(() => {
            this.selectTaskApprovers = arr;
        })
    }

    @action
    managerApiAction = async (manager_id) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { func_id, func_dtl, key } = this.selectTask;
        const sameData = {
            user_id: staff_no,
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
        const data = await managerApi({
            ...sameData,
        });

        let arr = [];
        //格式化请求回来的数据
        data && data.resultdata && data.resultdata.managers && data.resultdata.managers.map(info => {
            //判断是否为默认，若为默认则插入数组最前面
            if (info.is_default == '1') {
                arr.unshift({
                    value: info.approver_id,
                    label: info.approver_name,
                })
            } else {
                arr.push({
                    value: info.approver_id,
                    label: info.approver_name,
                })
            }
        })
        runInAction(() => {
            this.selectTaskManagers = arr;
            Toast.hide();
        })
    }

}

export default new True();