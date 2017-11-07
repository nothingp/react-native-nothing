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
    leaveLeaveinfoApi,
    leaveawardDetailsApi,
    claimsDetailsApi,
    noticeListApi,
    noticeDetailApi,
    leaveLeavebalanceApi,
    leaveRecentLeaveApi,
    leaveListApi,
} from '../services/trueService'
//页面提醒
import { Toast } from 'antd-mobile';

import Base from './Base'

//页面跳转

class True {
    @observable linkCheckData = 'https://ess.echrssc.com'; // 检查link数据返回
    @observable taskListPEData = ''; // 获取待处理任务列表
    @observable taskListPDData = ''; // 获取已处理任务列表
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
    @observable leaveLeaveinfoDetail = '';
    @observable leaveawardDetail = '';
    @observable claimsDetails = '';
    @observable noticeListData = '';
    @observable noticeDetailData = '';
    @observable leaveLeavebalanceData = '';
    @observable leaveRecentLeaveData = '';
    @observable allLeaveList = []; //所有请假列表（基于月份）
    @observable submitLeaveList = []; //提交中的请假列表
    @observable approveLeaveList = []; //审批中的请假列表
    @observable rejectLeaveList = []; //被拒绝的请假列表
    @observable cancelLeaveList = []; //取消提交请假列表

    @observable taskSelectType = {
        label: '所有',
        value: 'ALL'
    };  //任务导航头部选中的分类

    @observable recentLeaveType = {};  //近期假期记录头部选中的分类

    @observable activeKey = 'PE';//task处理状态

    @observable selectTask = {};  //选中记录的任务信息
    @observable selectTaskApprovers = []; //选中记录的审批人信息
    @observable selectTaskManagers = []; //选中记录的其他审批人信息
    @observable selectApprover = {};  //选中的审批人

    constructor() {
        autorun(() => {
            if (!Base.userInfo) {
            }
        })

        autorun(() => {
            if (this.selectTask.function) {
                this.approverApiAction();
            }
        })
    }

    @action
    linkcheckAction = async (link) => {
        // const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        // const data = await linkcheckApi({
        //     user_id: staff_no,
        //     session_id,
        //     company_code,
        //     empn_no,
        //     enable_ta,
        //     staff_no
        // });
        // runInAction(() => {
        //     if (data.result == "ERR") {
        //         Toast.fail('输入的系统地址无效', 1);
        //     }
        //     else {
        //         Toast.hide();
        //         this.linkCheckData = data.resultdata;
        //     }
        // });
        this.linkCheckData = link;
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
            if (data.result == "ERR") {
            }
            else {
                Toast.hide();
                if (status == 'PE') {
                    this.taskListPEData = data.resultdata;
                } else {
                    this.taskListPDData = data.resultdata;
                }
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
    personaldataDetailApiAction = async (userData, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await personaldataDetailApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            person_tbl_approve_id: userData.id,
        });
        runInAction(() => {
            if (data.result == "ERR") {
            }
            else {
                Toast.hide();
                this.personaldataDetailData = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    taskSubmitApiAction = async (status, func_id, func_dtl, key, remark, approver_id, cb) => {
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
    emergencycontactDetailApiAction = async (userData, cb) => {
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
            relationship_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.emergencycontactDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    addressDetailApiAction = async (userData, cb) => {
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
            address_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.addressDetailData = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    educationDetailApiAction = async (userData, cb) => {
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
            education_tbl_approve_id: userData.id
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
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    identityDetailApiAction = async (userData, cb) => {
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
            id_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.identityDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    bankaccountDetailApiAction = async (userData, cb) => {
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
            net_pay_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.bankaccountDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    certificateDetailApiAction = async (userData, cb) => {
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
            license_cert_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.certificateDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    experienceDetailApiAction = async (userData, cb) => {
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
            experience_tbl_approve_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.experienceDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    leaveLeaveinfoApiAction = async (userData, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await leaveLeaveinfoApi({
            ...sameData,
            lv_apply_tbl_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveLeaveinfoDetail = {
                    ...data.resultdata,
                    ...userData,
                    // img: userData.user_photo,
                    activeKey: this.activeKey,
                    // key: userData.id,
                    // name: userData.name,
                };
                cb && cb();
            }
        });
    }

    @action
    leaveawardDetailsApiAction = async (userData, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await leaveawardDetailsApi({
            ...sameData,
            lv_adj_tbl_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveawardDetail = {
                    ...data.resultdata,
                    ...userData,
                };
                cb && cb();
            }
        });
    }

    @action
    claimsDetailsApiAction = async (userData, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await claimsDetailsApi({
            ...sameData,
            claims_id: userData.id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.claimsDetails = {
                    ...data.resultdata,
                    ...userData,
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
    noticeListApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await noticeListApi({
            ...sameData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.noticeListData = { ...data.resultdata };
            }
        });
    }

    @action
    noticeDetailApiAction = async (alert_tbl_id) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await noticeDetailApi({
            ...sameData,
            alert_tbl_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.noticeDetailData = { ...data.resultdata };
            }
        });
    }

    @action
    leaveLeavebalanceApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await leaveLeavebalanceApi({
            ...sameData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveLeavebalanceData = { ...data.resultdata };
            }
        });
    }

    @action
    leaveRecentLeaveApiAction = async (begin_time, end_time) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await leaveRecentLeaveApi({
            ...sameData,
            begin_time,
            end_time
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveRecentLeaveData = { ...data.resultdata };
            }
        });
    }

    @action
    approverApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { key = "" } = this.selectTask;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id: this.selectTask.function,
            func_dtl: this.selectTask.function_dtl,
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
            this.selectApprover = arr.length > 0 ? arr[0] : {};
        })
    }

    @action
    selectApproverAction = async (selectApprover) => {
        this.selectApprover = selectApprover;
    }

    @action
    managerApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { key = "" } = this.selectTask;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id: this.selectTask.function,
            func_dtl: this.selectTask.function_dtl,
            manager_id: staff_no,
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

    @action
    getLeaveList = async (month) => {
        //获取请假列表
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            month
        }
        const data = await leaveListApi({
            ...sameData,
        });
        console.log('获取到请求数据')
        console.log(data);

        let allLeaveList = []; //所有请假列表（基于月份）
        let submitLeaveList = []; //提交中的请假列表
        let approveLeaveList = []; //审批中的请假列表
        let rejectLeaveList = []; //被拒绝的请假列表
        let cancelLeaveList = []; //取消提交请假列表
        data && data.resultdata && data.resultdata.map(info => {
            const {status} = info;
            //判断类型
            allLeaveList.push(info)
            //提交中
            if(status == 'N'){
                submitLeaveList.push(info);
            }else if(status == 'P') {
                approveLeaveList.push(info);
            }else if(status == 'R') {
                rejectLeaveList.push(info);
            }else if(status == 'A') {
                cancelLeaveList.push(info);
            }
        })

        runInAction(() => {
            this.allLeaveList = allLeaveList;
            this.submitLeaveList = submitLeaveList;
            this.approveLeaveList = approveLeaveList;
            this.rejectLeaveList = rejectLeaveList;
            this.cancelLeaveList = cancelLeaveList;
        })
    }
}

export default new True();