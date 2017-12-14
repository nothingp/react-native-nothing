// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';
import { NavigationActions } from 'react-navigation'

import loading from '../decorators/loading';
import log from '../decorators/log';
import {
    loginApi,
    alertsListApi,
    resetPwdApi,
    personalDataApi,
    personalInfoApi,
    addressInfoApi,
    relationShipApi,
    bankAccountApi,
    sendForgetPwdEmailApi,
    fileUploadApi,
    personalPhotoApi,
    approverApi,
    submitUserInfoApi,
    saveSelfAddressApi,
    cancelPersonalApi,
    addRelationApi,
    saveRelationApi,
    getIdentityApi,
    saveIdentityApi,
    saveBankInfoApi,
    getWorkListApi,
    addExperienceApi,
    changeExperienceApi,
    cancelSaveAddressApi,
    getEduListApi,
    getSimplePersonApi,
    cancelChangeRelationApi,
    cancelSaveCredentialApi,
    cancelSaveCardApi,
    getSimpleWorkApi,
    cancelSaveWorkApi,
    getSimpleEduApi,
    changeEduExpApi,
    addEduExpApi,
    cancelSaveEducationApi,
    geCertListApi,
    addCertApi,
    editCertApi,
    cancelSaveCertApi,
    getSimpleCertApi,
    leaveListApi,
    claimsListApi,
    getDurdaysApi,
    postLvApplyApi,
    cancelApplyHolidayApi,
    getHolidayDetailApi,
    getLeaveawardListApi,
    postLeaveawardApplyApi,
    getLeaveawardDetailsApi,
    cancelApplyAdjApi,
    getApproverprodetailApi,
    cancelLeaveApplyApi,
} from '../services/baseService'
//页面提醒
import { Toast, Modal } from 'antd-mobile';

//自己封装的工具库
import { merged, format } from '../common/Tool';

import { create, persist } from 'mobx-persist'
import Base from './Base'

const alert = Modal.alert;

class User {
    @observable userDetail = ''; //保存用户详细信息

    @observable personalInfo = {}; //保存用户名字， 头像， 职位

    @observable addressInfo = ''; //保存用户地址信息

    @observable relationShipInfo = ''; //保存紧急联系人信息

    @observable bankCard = ''; //保存银行卡信息

    @observable alertsListData = []; //用户消息列表

    @observable noAlertList = false; //没有用户消息列表

    @observable alertsListLoading = false; //用户消息列表

    @observable alertsListMore = true; //用户消息是否还有更多

    @observable alertsDetailData = ''; //用户消息详情

    @observable approverList = []; //审批人列表

    @observable sendForgetPwdEmailData = ''; //忘记密码发送邮件返回数据

    @observable selectPerson = {}; //选中编辑的人

    @observable selfIdentity = {}; //个人证件信息

    @observable selfWorkList = []; //个人工作列表

    @observable selectExp = {}; //选中的工作经历

    @observable selfEduList = []; //个人教育列表

    @observable selectEduItem = {}; //选中的教育列表

    @observable selfCertList = []; //个人的证书列表

    @observable selectCertItem = {}; //选中的个人证书

    @observable selectLeaveMonth = ''; //选中的日期
    @observable allLeaveList = []; //所有请假列表（基于月份）
    @observable submitLeaveList = []; //提交中的请假列表
    @observable approveLeaveList = []; //审批中的请假列表
    @observable rejectLeaveList = []; //被拒绝的请假列表
    @observable cancelLeaveList = []; //取消提交请假列表
    @observable passLeaveList = []; //通过的请假列表

    @observable selectLeaveawardMonth = ''; //选中的日期
    @observable submitLeaveawardList = []; //提交中的可调休假列表
    @observable approveLeaveawardList = []; //审批中的可调休假列表
    @observable rejectLeaveawardList = []; //被拒绝的可调休假列表
    @observable cancelLeaveawardList = []; //取消提交可调休假列表
    @observable passLeaveawardList = []; //通过的可调休假列表

    //@observable loginError = ''; //登录错误的失败信息

    @observable dur_days = ''; //请假
    @observable selectLvDetail = {}; //选中的请假信息详情
    @observable selectAdjDetail = {}; //选中的可调休申报信息详情

    @observable saveClaimsList = []; //保存的报销列表
    @observable submitClaimsList = []; //提交的报销列表
    @observable passClaimsList = []; //通过的报销列表
    @observable rejectClaimsList = []; //被拒绝的报销列表
    @observable cancelClaimsList = []; //取消的报销列表\
    @observable approveClaimsList = []; //审批中

    @observable comments = []; //审批流程

    @observable promptFn = () => {
    }; //声明调用方法

    constructor() {
        autorun(() => {
            if (!Base.userInfo) {
                this.userDetail = [];
                this.alertsListData = [];
                this.sendForgetPwdEmailData = [];
            }
        })
    }

    @action
    alertsList = async (page_index = 1, status = 1, type) => {
        //user_id, session_id, company_code, empn_no, enable_ta, staff_no, status = 1, page_index = 1, page_size = 10
        const { session_id, staff_no, company_code, empn_no, enable_ta } = Base.userInfo;
        if (type != 'append') {
            this.alertsListLoading = true;
        }
        if (page_index == 1) {
            this.alertsListData = [];
        }
        this.noAlertList = false;
        const data = await alertsListApi({
            session_id,
            staff_no,
            company_code,
            empn_no,
            status,
            enable_ta,
            user_id: staff_no,
            page_index,
            page_size: 10
        });
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.hide();
                const dataList = data.resultdata.data || [];
                if (type != 'append') {
                    this.alertsListLoading = false;
                }
                if (page_index == 1 && dataList.length == 0) {
                    this.noAlertList = true;
                }
                this.alertsListMore = dataList.length < 10 ? false : true;
                this.alertsListData = [...this.alertsListData, ...dataList];
            }
        });
    }

    @action
    alertsDetail = (data) => {
        runInAction(() => {
            this.alertsDetailData = data;
            Toast.hide();
        });
    }

    @action
    sendForgetPwdEmail = async (username, navigation) => {
        const data = await sendForgetPwdEmailApi(username);
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.info(`提交成功，我们将发送邮件到您的邮箱（${username}），请查收`, 1, () => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login' })
                        ]
                    })
                    navigation.dispatch(resetAction);
                });
            }
        });
    }

    @action
        //获取用户详细个人信息
    getPersonDetail = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await personalDataApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        });
        runInAction(() => {
            this.userDetail = data.resultdata
        });
    }

    @action
        //请求名字 头像 职位
    getPersonalInfo = async () => {
        try {
            const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;

            const data = await personalInfoApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no
            });

            runInAction(() => {

                this.personalInfo = data.resultdata;
            })
        } catch (err) {

        }
    }

    @action
    updateUserPhoto = async (response) => {

        //调用上传头像的接口
        try {
            const { session_id, staff_no, company_code, empn_no, enable_ta } = Base.userInfo;
            const pic = response.data;

            const data = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });

            this.personalInfo.user_photo = data.resultdata.url;

            const result = await personalPhotoApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no,
                user_photo: data.resultdata.url
            })

            runInAction(() => {

            })
        } catch (err) {

        }
    }

    @action
        //请求用户地址信息
    getAddressInfo = async () => {
        try {
            const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;

            const data = await addressInfoApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no
            });
            console.log(data)

            runInAction(() => {
                this.addressInfo = data.resultdata;
            })

        } catch (err) {
        }
    }

    @action
        //取消修改地址信息
    cancelChangeAddress = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveAddressApi({ session_id, company_code, empn_no, enable_ta, staff_no });
        if (status && status.result == 'OK') {
            Toast.success('取消修改地址信息成功！', 1);
            this.getAddressInfo();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //请求紧急联系人信息
    getRelationShip = async () => {
        try {
            const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;

            const data = await relationShipApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no
            });
            runInAction(() => {
                this.relationShipInfo = data.resultdata;
            })
        } catch (err) {

        }
    }

    @action
        //请求支付账户信息（银行卡信息
    getBankAccount = async () => {
        try {
            const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;

            const data = await bankAccountApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no
            });

            runInAction(() => {
                console.log(data);
                this.bankCard = data.resultdata;
            })
        } catch (err) {

        }
    }

    @action
        //获取审批人列表
    getApprover = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;

        const data = await approverApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
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
            this.approverList = arr;
        })
    }

    @action
        //保存个人信息
    saveSelfInfo = async (userInfo, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(userInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await submitUserInfoApi(obj);
        if (status && status.result == 'OK') {
            Toast.success('修改个人信息成功！请等待审核', 1, () => {
                successFn && successFn();
            });
            this.getPersonDetail();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //保存个人地址
    saveSelfAddress = async (addressInfo, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(addressInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await saveSelfAddressApi(obj);
        if (status && status.result == 'OK') {
            Toast.success('修改个人地址信息成功！请等待审核', 1, () => {
                successFn && successFn();
            });
            this.getAddressInfo();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //获取证件信息
    getIdentityInfo = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
    }

    @action
        //取消修改个人信息
    cancelChangeInfo = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelPersonalApi({ session_id, company_code, empn_no, enable_ta, staff_no });
        if (status && status.result == 'OK') {
            Toast.success('取消提交修改个人信息成功！', 1);
            this.getPersonDetail();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //添加联系人信息
    addRelationFn = async (RelationInfo, successFn) => {
        const { is_save } = RelationInfo;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(RelationInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await addRelationApi(obj);
        if (status && status.result == 'OK') {
            Toast.success(is_save == '1' ? '保存联系人成功！' : '提交联系人信息成功，请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getRelationShip();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //设置选中的联系人信息
    setCheckedPerson = (info) => {
        this.selectPerson = info;
    }

    @action
        //添加联系人信息
    saveRelationFn = async (RelationInfo, successFn) => {
        const { is_save } = RelationInfo;

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(RelationInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await saveRelationApi(obj);
        if (status && status.result == 'OK') {
            Toast.success(is_save == '1' ? '保存联系人成功！' : '提交联系人信息成功，请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getRelationShip();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //取消提交联系人信息
    cancelChangeRelation = async () => {
        const { relationship_tbl_approve_id } = this.selectPerson;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = { session_id, company_code, empn_no, enable_ta, staff_no, relationship_tbl_approve_id };
        const status = await cancelChangeRelationApi(obj);
        if (status && status.result == 'OK') {
            Toast.success('取消更改联系人成功！', 1);
            this.getRelationShip();
            this.getSimplePersonInfo();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }
    @action
        //获取个人的证件信息
    getIdentity = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getIdentityApi(obj);

        if (data && data.result == 'OK') {
            this.selfIdentity = data.resultdata;
        }
    }

    @action
        //保存个人证件信息
    saveIdentity = async (obj, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const user = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = merged(obj, user);
        const status = await saveIdentityApi(data);
        if (status && status.result == 'OK') {
            Toast.success('提交证件信息成功！请等待审核！', 1, () => {
                successFn && successFn();
            });
            this.getIdentity()
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //保存个人银行卡信息
    saveCardInfo = async (obj, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const user = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const pic = obj.imgArr;
        let attachment = [];
        //判断是否有文件
        for(let i = 0; i<pic.length; i++){
            const info = pic[i];

            if (info.data) {
                //图片文件上传
                Toast.loading('附件上传中...');
                const resData = await fileUploadApi({
                    user_id: staff_no,
                    session_id,
                    pic: info.data,
                    file_folder: 'Person_Photo',
                    pic_suffix: 'jpg'
                });
                Toast.hide();
                if (resData && resData.result == 'OK') {
                    // doctor_certificate = resData.resultdata.url
                    console.log(resData.resultdata.url)
                    attachment.push(resData.resultdata.url)
                } else {
                    Toast.fail(resData.resultdesc, 1);
                    return;
                }
            }else{
                attachment.push(info.uri)
            }
        }
        const data = merged(obj, user, { attachment: attachment ? attachment : this.bankCard? this.bankCard.attachment:''});
        console.log(data)

        const status = await saveBankInfoApi(data);
        if (status && status.result == 'OK') {
            Toast.success('提交银行卡信息成功！请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getBankAccount();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //获取工作列表
    getWorkList = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await getWorkListApi(obj);
        if (status && status.result == 'OK') {
            this.selfWorkList = status.resultdata;
        }
    }

    @action
        //新增工作经历
    addWorkExp = async (reqData, successFn) => {
        const { is_save } = reqData;

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await addExperienceApi(merged(obj, reqData));
        if (status && status.result == 'OK') {
            Toast.success(is_save == '1' ? '保存工作经历成功！' : '提交工作经历成功！请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getWorkList();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //设置选中的工作经历
    setCheckedExp = (info) => {
        this.selectExp = info;
    }

    @action
        //修改工作经历
    editWorkExp = async (reqData, successFn) => {
        const { is_save } = reqData;

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await changeExperienceApi(merged(obj, reqData));
        if (status && status.result == 'OK') {
            Toast.success(is_save == '1' ? '保存工作经历成功！' : '提交工作经历成功！请等待审核！', 1, () => {
                successFn && successFn();
            });
            this.getWorkList();
            return true;
        } else {
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
        //获取教育经历
    getEduList = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await getEduListApi(obj);
        if (status && status.result == 'OK') {
            this.selfEduList = status.resultdata;
        }
    }

    @action
        //设置选中的教育经历
    setCheckedEdu = (info) => {
        this.selectEduItem = info;
    }

    @action
        //获取证书列表信息
    getCertList = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await geCertListApi(obj);
        if (status && status.result == 'OK') {
            this.selfCertList = status.resultdata;
        }
    }

    @action
        //请求单条联系人的详情信息
    getSimplePersonInfo = async () => {
        const { relationship_tbl_id, relationship_tbl_approve_id } = this.selectPerson;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            relationship_tbl_id,
            relationship_tbl_approve_id,
        }
        const status = await getSimplePersonApi(obj);
        if (status && status.result == 'OK') {
            this.selectPerson = status.resultdata;
        }
    }

    @action
        //取消修改地址信息
    cancelChangeCredential = async () => {

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveCredentialApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        });
        if (status && status.result == 'OK') {
            Toast.success('取消修改证件信息成功！', 1);
            this.getIdentity();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //取消修改银行卡信息
    cancelChangeCard = async () => {

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveCardApi({ session_id, company_code, empn_no, enable_ta, staff_no });
        if (status && status.result == 'OK') {
            Toast.success('取消修改银行卡信息成功！', 1);
            this.getBankAccount();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //取消修改工作经历信息
    cancelChangeWorkExp = async () => {
        const { experience_tbl_id, experience_tbl_approve_id } = this.selectExp;

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveWorkApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            experience_tbl_approve_id
        });
        if (status && status.result == 'OK') {
            Toast.success('取消修改工作经历成功！', 1);
            this.getWorkList();
            this.getSimpleWorkInfo({ experience_tbl_id, experience_tbl_approve_id });
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //请求单条工作经历的详情信息
    getSimpleWorkInfo = async ({ experience_tbl_id, experience_tbl_approve_id }) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            experience_tbl_id,
            experience_tbl_approve_id,
        }
        const status = await getSimpleWorkApi(obj);
        if (status && status.result == 'OK') {
            this.selectExp = status.resultdata;
        }
    }

    @action
        //请求单条的教育经历信息
    getSimpleEduInfo = async () => {
        const { education_tbl_id, education_tbl_approve_id } = this.selectEduItem;

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            education_tbl_id,
            education_tbl_approve_id,
        }
        const status = await getSimpleEduApi(obj);
        if (status && status.result == 'OK') {
            this.selectEduItem = status.resultdata;
        }
    }

    @action
        //修改教育经历
    editEduExp = async (reqData, successFn) => {

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let cert_filename = ""; //附件路径

        const pic = reqData.imgInfo;
        //判断是否有文件
        if (pic) {
            //图片文件上传
            Toast.loading('附件上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: pic.data,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                cert_filename = resData.resultdata.url
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        }

        const data = merged(obj, reqData, { cert_filename: cert_filename ? cert_filename : this.selectEduItem.cert_filename });
        const status = await changeEduExpApi(data);
        if (status && status.result == 'OK') {
            const { is_save } = reqData;
            Toast.success(is_save == '1' ? '保存教育经历成功！' : '提交教育经历成功！请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getEduList();
            this.getSimpleEduInfo();
            return true;
        } else {
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
        //新增教育经历
    addEduExp = async (reqData, successFn) => {

        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let cert_filename = ""; //附件路径
        const pic = reqData.imgInfo;
        //判断是否有文件
        if (pic) {
            //图片文件上传
            Toast.loading('附件上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: pic.data,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                cert_filename = resData.resultdata.url
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        }
        const status = await addEduExpApi(merged(obj, reqData, { cert_filename }));
        if (status && status.result == 'OK') {
            const { is_save } = reqData;
            Toast.success(is_save == '1' ? '保存教育经历成功！' : '提交教育经历成功！请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getEduList();
            this.getSimpleEduInfo();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //取消修改教育信息
    cancelChangeEducation = async (successFn) => {
        const { education_tbl_approve_id } = this.selectEduItem;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveEducationApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            education_tbl_approve_id
        });
        if (status && status.result == 'OK') {
            Toast.success('取消修改教育信息成功！', 1, () => {
                successFn && successFn()
            });
            this.getEduList();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //设置选中的证书信息
    setCheckedCert = (info) => {
        this.selectCertItem = info;
    }

    @action
        //修改证书信息
    editCertExp = async (reqData, successFn) => {
        const { is_save } = reqData;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }

        let attach_path = ""; //附件路径

        const pic = reqData.imgInfo;
        //判断是否有文件
        if (pic) {
            //图片文件上传
            Toast.loading('附件上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: pic.data,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                attach_path = resData.resultdata.url
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        }

        const data = merged(obj, reqData, { attach_path: attach_path ? attach_path : this.selectCertItem.attach_path });

        const status = await editCertApi(data);
        if (status && status.result == 'OK') {
            Toast.success(is_save == '1' ? '保存证书信息成功！' : '提交证书信息成功！请等待审核！', 1, () => {
                successFn && successFn()
            });
            this.getCertList();
            return true;
        } else {
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
        //新增证书信息
    addCertExp = async (reqData, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let attach_path = ""; //附件路径
        const pic = reqData.imgInfo;
        //判断是否有文件
        if (pic) {
            //图片文件上传
            Toast.loading('附件上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: pic.data,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                attach_path = resData.resultdata.url
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        }
        const status = await addCertApi(merged(obj, reqData, { attach_path }));

        if (status && status.result == 'OK') {
            const { is_save } = reqData;
            Toast.success(is_save == '1' ? '保存证书信息成功！' : '提交证书信息成功！请等待审核！', 1, () => {
                successFn && successFn();
            });
            this.getCertList();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //取消修改证件信息
    cancelChangeCert = async (successFn) => {

        const { license_cert_tbl_approve_id } = this.selectCertItem;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await cancelSaveCertApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            license_cert_tbl_approve_id
        });
        if (status && status.result == 'OK') {
            Toast.success('取消修改证件信息成功！', 1, () => {
                successFn && successFn();
            });
            this.getCertList();
            this.getSimpleCertInfo();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //请求单条的证书信息
    getSimpleCertInfo = async () => {
        const { license_cert_tbl_approve_id, license_cert_tbl_id } = this.selectCertItem;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            license_cert_tbl_id,
            license_cert_tbl_approve_id
        }
        const status = await getSimpleCertApi(obj);
        if (status && status.result == 'OK') {
            this.selectCertItem = status.resultdata;
        }
    }


    @action
    getLeaveList = async (month) => {
        if (!month) {
            month = this.selectLeaveMonth;
        }else{
            this.selectLeaveMonth = month
        }
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

        let allLeaveList = []; //所有报销列表（基于月份）
        let saveClaimsList = []; //保存的报销列表
        let submitLeaveList = []; //提交中的请报销列表
        let approveLeaveList = []; //审批中的报销列表
        let rejectLeaveList = []; //被拒绝的报销列表
        let cancelLeaveList = []; //取消提交报销列表
        let passLeaveList = []; //通过的报销列表

        data && data.resultdata && data.resultdata.map(info => {
            const { status } = info;
            //判断类型
            allLeaveList.push(info)
            //提交中
            if (status == 'N') {
                submitLeaveList.push(info);
            } else if (status == 'P' || status == 'I') {
                approveLeaveList.push(info);
            } else if (status == 'R') {
                rejectLeaveList.push(info);
            } else if (status == 'A') {
                passLeaveList.push(info);
            } else if (status == 'C' || status == 'D') {
                cancelLeaveList.push(info);
            }
        })

        runInAction(() => {
            // this.allLeaveList = allLeaveList;
            this.submitLeaveList = submitLeaveList;
            this.approveLeaveList = approveLeaveList;
            this.rejectLeaveList = rejectLeaveList;
            this.cancelLeaveList = cancelLeaveList;
            this.passLeaveList = passLeaveList;
        })
    }

    @action
    getClaimsList = async (month) => {
        //获取报销列表（按月）
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

        Toast.loading('loading');

        const data = await claimsListApi({
            ...sameData,
        });

        let submitClaimsList = []; //提交
        let approveClaimsList = []; //审批中
        let rejectClaimsList = []; //被拒绝
        let cancelClaimsList = []; //取消
        let passClaimsList = []; //通过
        let saveClaimsList = []; //保存

        data && data.resultdata && data.resultdata.claims_list.map(info => {
            const { status } = info;
            //判断类型
            if (status == 'N') {
                submitClaimsList.push(info);
            } else if (status == 'P') {
                approveClaimsList.push(info);
            } else if (status == 'R') {
                rejectClaimsList.push(info);
            } else if (status == 'A') {
                passClaimsList.push(info);
            } else if (status == 'C') {
                cancelClaimsList.push(info);
            } else if (status == 'S') {
                saveClaimsList.push(info);
            }
        })

        Toast.hide();

        runInAction(() => {
            this.submitClaimsList = submitClaimsList;
            this.approveClaimsList = approveClaimsList;
            this.rejectClaimsList = rejectClaimsList;
            this.cancelClaimsList = cancelClaimsList;
            this.passClaimsList = passClaimsList;
            this.saveClaimsList = saveClaimsList;
        })
    }

    //修改密码
    @action
    resetPwd = async (old_password, new_password, navigation) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        // console.log({
        //         user_id: staff_no,
        //         session_id,
        //         old_password,
        //         new_password
        //     })
        const data = await resetPwdApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            password: old_password,
            new_password
        });

        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
                console.log(data.resultdesc)
            }
            else {
                Toast.info('密码修改成功', 1, () => {
                    // const resetAction = NavigationActions.reset({
                    //     index: 0,
                    //     actions: [
                    //         NavigationActions.navigate({ routeName: 'Login' })
                    //     ]
                    // })
                    // navigation.dispatch(resetAction);
                });
            }
        });
    }

    //获取请假天数
    getDurdays = async ({ lv_type, begin_time, begin_time_half, end_time, end_time_half }) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            lv_type,
            begin_time,
            begin_time_half,
            end_time,
            end_time_half
        }
        const data = await getDurdaysApi(obj);
        let dur_days = ''; //请假时长
        if (data && data.result == 'OK') {
            dur_days = data.resultdata.dur_days;
        }
        return dur_days;
    }

    @action
        //保存
    postLvApply = async (reqData, successFn, failFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        // let doctor_certificate = this.selectLvDetail.doctor_certificate; //附件路径
        const pic = reqData.imgArr;
        let doctor_certificate = [];
        //判断是否有文件
        for(let i = 0; i<pic.length; i++){
            const info = pic[i];

            if (info.data) {
                //图片文件上传
                Toast.loading('附件上传中...');
                const resData = await fileUploadApi({
                    user_id: staff_no,
                    session_id,
                    pic: info.data,
                    file_folder: 'Person_Photo',
                    pic_suffix: 'jpg'
                });
                Toast.hide();
                if (resData && resData.result == 'OK') {
                    // doctor_certificate = resData.resultdata.url
                    console.log(resData.resultdata.url)
                    doctor_certificate.push(resData.resultdata.url)
                } else {
                    Toast.fail(resData.resultdesc, 1);
                    return;
                }
            }else{
                doctor_certificate.push(info.uri)
            }
        }
        let data = merged(obj, reqData, { doctor_certificate })
        //根据resubmit判断是编辑还是新增//默认0：新增 1：修改
        if (reqData.ifEdit == 1) {
            const { lv_apply_tbl_id } = this.selectLvDetail;
            data = {
                ...data,
                lv_apply_tbl_id
            }
        }

        const status = await postLvApplyApi(data);

        if (status && status.result == 'OK') {
            const { begin_time } = reqData;
            Toast.success('提交请假申请成功！请等待审核！', 1, () => {
                successFn && successFn();
            });
            const arr = begin_time.split('-')
            const month = arr[0] + '-' + arr[1];
            this.getHolidayDetail();
            this.getLeaveList(month);
        } else {
            // const alertStr = status.resultdata ? status.resultdata.alert_message : status.resultdesc;
            failFn && failFn(status)
        }
    }

    @action
        //选中的请假详情信息
    selectLvDetailFn = (data) => {
        this.selectLvDetail = data;
    }

    @action
        //取消假期申请
    cancelApplyHoliday = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { lv_apply_tbl_id } = this.selectLvDetail;

        const status = await cancelApplyHolidayApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            lv_apply_tbl_id
        });
        if (status && status.result == 'OK') {
            Toast.success('取消假期申请成功！', 1);
            this.getHolidayDetail();
            this.getLeaveList();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //获取假期的详细信息
    getHolidayDetail = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { lv_apply_tbl_id } = this.selectLvDetail;

        const status = await getHolidayDetailApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            lv_apply_tbl_id
        });
        if (status && status.result == 'OK') {
            this.selectLvDetail = status.resultdata;
        }
    }


    @action
        //获取可调休申报假期的列表
    getLeaveawardList = async (month) => {
        if (!month) {
            month = this.selectLeaveawardMonth;
        }else{
            this.selectLeaveawardMonth = month
        }
        Toast.loading()
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
        const data = await getLeaveawardListApi({
            ...sameData,
        });
        Toast.hide()

        console.log('获取到请求数据')
        console.log(data);

        let allLeaveawardList = []; //所有报销列表（基于月份）
        let submitLeaveawardList = []; //提交中的请报销列表
        let approveLeaveawardList = []; //审批中的报销列表
        let rejectLeaveawardList = []; //被拒绝的报销列表
        let cancelLeaveawardList = []; //取消提交报销列表
        let passLeaveawardList = []; //通过的报销列表

        data && data.resultdata && data.resultdata.map(info => {
            const { status } = info;
            //判断类型
            allLeaveawardList.push(info)
            //提交中
            if (status == 'N') {
                submitLeaveawardList.push(info);
            } else if (status == 'P') {
                approveLeaveawardList.push(info);
            } else if (status == 'R') {
                rejectLeaveawardList.push(info);
            } else if (status == 'A') {
                passLeaveawardList.push(info);
            } else if (status == 'C') {
                cancelLeaveawardList.push(info);
            }
        })

        runInAction(() => {
            // this.allLeaveawardList = allLeaveawardList;
            this.submitLeaveawardList = submitLeaveawardList;
            this.approveLeaveawardList = approveLeaveawardList;
            this.rejectLeaveawardList = rejectLeaveawardList;
            this.cancelLeaveawardList = cancelLeaveawardList;
            this.passLeaveawardList = passLeaveawardList;
        })
    }

    @action
        //保存可调休假申报
    postLeaveawardApply = async (reqData, successFn) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let data = {
            ...obj,
            ...reqData
        }
        //判断编辑还是新增
        const { type } = reqData;
        if (type == 'edit') {
            //编辑
            const { lv_adj_tbl_id } = this.selectAdjDetail;
            data = {
                ...data,
                lv_adj_tbl_id
            }
        }
        const status = await postLeaveawardApplyApi(data);
        console.log(status)
        if (status && status.result == 'OK') {
            Toast.success('提交调休假申报成功！请等待审核！', 1, () => {
                successFn && successFn();
            });
            this.getLeaveawardDetail();
            this.getLeaveawardList();
        } else {
            const alertStr = status.resultdata ? status.resultdata.alert_message : status.resultdesc;
            Toast.fail(alertStr, 1);
        }
    }

    @action
        //获取可调休申报假期的详细信息
    getLeaveawardDetail = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { lv_adj_tbl_id } = this.selectAdjDetail;

        const status = await getLeaveawardDetailsApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            lv_adj_tbl_id
        });
        if (status && status.result == 'OK') {
            this.selectAdjDetail = status.resultdata;
        }
    }

    @action
        //选中的请假详情信息
    selectAdjDetailFn = (data) => {
        this.selectAdjDetail = data;
    }

    @action
        //取消可调休申请
    cancelApplyAdj = async () => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const { lv_adj_tbl_id } = this.selectAdjDetail;

        const status = await cancelApplyAdjApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            lv_adj_tbl_id
        });
        if (status && status.result == 'OK') {
            Toast.success('取消可调休申请成功！', 1);
            this.getLeaveawardDetail();
            this.getLeaveawardList();
        } else {
            Toast.fail(status.resultdesc, 1);
        }
    }

    @action
        //获取审批流程
    getComments = async ({ func_id, func_dtl, key }) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const status = await getApproverprodetailApi({
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            func_id,
            func_dtl,
            key
        });
        console.log('获取审批流程')
        console.log(status)
        if (status && status.result == 'OK') {
            this.comments = status.resultdata;
        }
    }

    @action
        //取消申请审批通过的假期
    cancelPassHoliday = async ({ remark, approver_id }) => {
        const { lv_apply_tbl_id } = this.selectLvDetail;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            remark,
            approver_id,
            lv_apply_tbl_id
        }
        const status = await cancelLeaveApplyApi(obj);
        if (status && status.result == 'OK') {
            Toast.success('取消假期申请成功！', 1);
            this.getHolidayDetail();
            this.getLeaveList();
            return true;
        } else {
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }
}

export default new User();