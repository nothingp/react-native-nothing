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
} from '../services/baseService'
//页面提醒
import { Toast, Modal } from 'antd-mobile';

//自己封装的工具库
import { merged } from '../common/Tool';

import { create, persist } from 'mobx-persist'
import Base from './Base'

const alert = Modal.alert;

class User {
    @observable userDetail = ''; //保存用户详细信息

    @observable personalInfo = {}; //保存用户名字， 头像， 职位

    @observable addressInfo = ''; //保存用户地址信息

    @observable relationShipInfo = ''; //保存紧急联系人信息

    @observable bankCard = ''; //保存银行卡信息

    @observable alertsListData = ''; //用户消息列表

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

    @observable allLeaveList = []; //所有请假列表（基于月份）
    @observable submitLeaveList = []; //提交中的请假列表
    @observable approveLeaveList = []; //审批中的请假列表
    @observable rejectLeaveList = []; //被拒绝的请假列表
    @observable cancelLeaveList = []; //取消提交请假列表
    @observable passLeaveList = []; //通过的请假列表

    //@observable loginError = ''; //登录错误的失败信息

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
    alertsList = async () => {
        const { session_id, staff_no } = Base.userInfo;
        const data = await alertsListApi({ session_id, staff_no, user_id: staff_no });
        runInAction(() => {
            this.alertsListData = data.resultdata;
            Toast.hide();
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
            Toast.success(is_save == '1'?'保存联系人成功！': '提交联系人信息成功，请等待审核！', 1, () => {
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
            Toast.success(is_save == '1'?'保存联系人成功！': '提交联系人信息成功，请等待审核！', 1, () => {
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
    saveCardInfo = async (obj) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const user = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let attachment = ""; //附件路径

        const pic = obj.attachment;
        if (pic) {
            //图片文件上传
            Toast.loading('附件上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic,
                file_folder: 'Person_Photo',
                pic_suffix: 'jpg'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                attachment = resData.resultdata.url ? resData.resultdata.url : ''
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        }
        const data = merged(obj, user, { attachment: attachment ? attachment : this.bankCard.attachment });

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
            Toast.success(is_save == '1' ? '保存工作经历成功！':'提交工作经历成功！请等待审核！', 1, () => {
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
        console.log(111)
        console.log(status)
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
        const {education_tbl_id, education_tbl_approve_id} = this.selectEduItem;

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
            Toast.success(is_save == '1'?'保存教育经历成功！':'提交教育经历成功！请等待审核！', 1, () => {
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
            Toast.success(is_save == '1'?'保存教育经历成功！':'提交教育经历成功！请等待审核！', 1, () => {
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
            Toast.success(is_save == '1'?'保存证书信息成功！':'提交证书信息成功！请等待审核！', 1, () => {
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
        console.log(status)

        if (status && status.result == 'OK') {
            const { is_save } = reqData;
            Toast.success(is_save == '1'?'保存证书信息成功！':'提交证书信息成功！请等待审核！', 1, () => {
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
        let passLeaveList = []; //通过的请假列表

        data && data.resultdata && data.resultdata.map(info => {
            const {status} = info;
            //判断类型
            allLeaveList.push(info)
            //提交中
            if(status == 'N'){
                submitLeaveList.push(info);
            }else if(status == 'P' || status == 'I') {
                approveLeaveList.push(info);
            }else if(status == 'R') {
                rejectLeaveList.push(info);
            }else if(status == 'A') {
                passLeaveList.push(info);
            }else if(status == 'C' || status == 'D') {
                cancelLeaveList.push(info);
            }
        })

        runInAction(() => {
            this.allLeaveList = allLeaveList;
            this.submitLeaveList = submitLeaveList;
            this.approveLeaveList = approveLeaveList;
            this.rejectLeaveList = rejectLeaveList;
            this.cancelLeaveList = cancelLeaveList;
            this.passLeaveList = passLeaveList;
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
            old_password,
            new_password
        });

        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
                console.log(data.resultdesc)
            }
            else {
                // Toast.info(`提交成功，我们将发送邮件到您的邮箱（${username}），请查收`, 1, () => {
                //     const resetAction = NavigationActions.reset({
                //         index: 0,
                //         actions: [
                //             NavigationActions.navigate({ routeName: 'Login' })
                //         ]
                //     })
                //     navigation.dispatch(resetAction);
                // });
                console.log(data.resultdesc)
            }
        });
    }
}

export default new User();