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
    claimsClaimitemsApi,
    payslipApi,
    claimsSubmitApi,
    claimsCancelApi,
    claimsRemoveApi,
} from '../services/trueService'
//页面提醒
import { Toast } from 'antd-mobile';

import Base from './Base';
import User from './User';
import { format } from '../util/tool';

//页面跳转

class True {
    @observable linkCheckData = 'https://ess.echrssc.com'; // 检查link数据返回
    @observable taskListPEData = []; // 获取待处理任务列表
    @observable taskListPDData = []; // 获取已处理任务列表
    @observable sysfunctionmenuListData = []; // 获取 ESS PRC 功能权限接口
    @observable personaldataDetailData = {}; // 获取个人资料接口
    @observable taskSubmitData = {};
    @observable alertsSubmitData = {};
    @observable emergencycontactDetail = {};
    @observable addressDetailData = {};
    @observable educationDetail = {};
    @observable educationTypeData = {};
    @observable identityDetail = {};
    @observable bankaccountDetail = {};
    @observable certificateDetail = {};
    @observable experienceDetail = {};
    @observable leaveLeaveinfoDetail = {};
    @observable leaveawardDetail = {};
    @observable claimsDetails = {};
    @observable noticeListData = {};
    @observable noticeItem = {};
    @observable noticeDetailData = {};
    @observable leaveLeavebalanceData = [];
    @observable leaveRecentLeaveData = [];
    @observable claimsClaimitemsData = {};
    @observable payslipData = [];
    @observable pdfUrlData = {};
    @observable claimitem = {};
    @observable claimsSubmitData = {};
    @observable claimsCancelData = {};
    @observable claimsRemoveData = {};
    @observable claimsDetailData = {};//自定义的
    @observable claimitemsList = [];//自定义的

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
        autorun(() => {
            if (Base.userInfo) {
                User.getPersonalInfo();
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
        Toast.loading('loading');
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
                Toast.fail(data.resultdesc, 1);
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
        Toast.loading('loading');
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
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.sysfunctionmenuListData = data.resultdata;
            }
        });
    }

    @action
    personaldataDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };//todo 需要接口返回，暂时处理
        Toast.loading('loading');
        const data = await personaldataDetailApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            person_tbl_approve_id: userData.taskId,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.personaldataDetailData = {
                    ...data.resultdata,
                    ...userData,
                };
            }
        });
    }

    @action
    taskSubmitApiAction = async (status, func_id, func_dtl, key, remark, approver_id) => {
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
        Toast.loading('loading');
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
            }
        });
    }

    @action
    alertsSubmitApiAction = async (alert_tbl_id) => {
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
            }
        });
    }

    @action
    emergencycontactDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await emergencycontactDetailApi({
            ...sameData,
            relationship_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    addressDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        Toast.loading('loading');
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
            address_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    educationDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await educationDetailApi({
            ...sameData,
            education_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    identityDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await identityDetailApi({
            ...sameData,
            id_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    bankaccountDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await bankaccountDetailApi({
            ...sameData,
            net_pay_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    certificateDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await certificateDetailApi({
            ...sameData,
            license_cert_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    experienceDetailApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await experienceDetailApi({
            ...sameData,
            experience_tbl_approve_id: userData.taskId
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
            }
        });
    }

    @action
    leaveLeaveinfoApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await leaveLeaveinfoApi({
            ...sameData,
            lv_apply_tbl_id: userData.taskId
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
                };
            }
        });
    }

    @action
    leaveawardDetailsApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await leaveawardDetailsApi({
            ...sameData,
            lv_adj_tbl_id: userData.taskId
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
        Toast.loading('loading');
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
        Toast.loading('loading');
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
        Toast.loading('loading');
        const data = await leaveLeavebalanceApi({
            ...sameData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveLeavebalanceData = [...data.resultdata];
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
        Toast.loading('loading');
        const data = await leaveRecentLeaveApi({
            ...sameData,
            begin_time,
            end_time: format((new Date().getTime()), 'yyyy-MM-dd')
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.leaveRecentLeaveData = [...data.resultdata];
            }
        });
    }

    @action
    payslipApiAction = async (year) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await payslipApi({
            ...sameData,
            year,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.payslipData = data.resultdata ? [...data.resultdata] : [];
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

    //报销
    @action
    claimsDetailsApiAction = async () => {//审批详情
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const userData = { ...User.personalInfo, ...this.selectTask };
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await claimsDetailsApi({
            ...sameData,
            claim_id: userData.taskId
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
            }
        });
    }

    //申请详情
    @action
    claimsDetailsApplyApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await claimsDetailsApi({
            ...sameData,
            claim_id: this.claimsDetailData.claim_id
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.claimsDetails = {
                    ...data.resultdata,
                };
            }
        });
    }

    //申请详情
    @action
    claimsDetailDataAction = async (v) => {//仅仅用于取id
        runInAction(() => {
            this.claimsDetailData = v;
        });
    }

    @action
    addclaimsItemAction = async (v) => {//增加报销项
        runInAction(() => {
            this.claimitemsList = [...this.claimitemsList, v];
        });
    }

    @action
    claimsClaimitemsApiAction = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        const data = await claimsClaimitemsApi({
            ...sameData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                this.claimsClaimitemsData = { ...data.resultdata };
            }
        });
    }

    @action
    claimsSubmitApiAction = async (formData) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await claimsSubmitApi({
            ...sameData,
            ...formData,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.claimsSubmitData = data.resultdata;
            }
        });
    }

    @action
    claimsCancelApiAction = async (claim_id, cb) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await claimsCancelApi({
            ...sameData,
            claim_id,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.claimsCancelData = data.resultdata;
                cb && cb();
            }
        });
    }

    @action
    claimsRemoveApiAction = async (claim_id) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const sameData = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
        }
        Toast.loading('loading');
        const data = await claimsRemoveApi({
            ...sameData,
            claim_id,
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                this.claimsRemoveData = data.resultdata;
            }
        });
    }
}

export default new True();