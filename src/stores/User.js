// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';
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
    getEduListApi
} from '../services/baseService'
//页面提醒
import { Toast, Modal} from 'antd-mobile';
//自己封装的工具库
import {merged} from '../common/Tool';

import { create, persist } from 'mobx-persist'
import Base from './Base'

//页面跳转
import { startTabsScreen, startLoginScreen } from '../screens';

const alert = Modal.alert;

class User {
    @observable userDetail = ''; //保存用户详细信息

    @observable personalInfo = ''; //保存用户名字， 头像， 职位

    @observable addressInfo = ''; //保存用户地址信息

    @observable relationShipInfo = ''; //保存紧急联系人信息

    @observable bankCard = ''; //保存银行卡信息

    @observable alertsListData = ''; //用户消息列表

    @observable alertsDetailData = ''; //用户消息详情

    @observable approverList = []; //审批人列表

    @observable sendForgetPwdEmailData = ''; //忘记密码发送邮件返回数据

    @observable selectPerson = ''; //选中编辑的人

    @observable selfIdentity = {}; //个人证件信息

    @observable selfWorkList = []; //个人工作列表

    @observable selectExp = {}; //选中的工作经历

    @observable selfEduList = []; //个人教育列表

    @observable selectEduItem = {}; //选中的教育列表

    @observable selfCertList = []; //个人的证书列表

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

    // @computed async get alertsList () {
    //     const {session_id,staff_no} = Base.userInfo;
    //     const data = await alertsListApi({session_id,staff_no, user_id: staff_no});
    //     return data.resultdata;
    // }

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
    sendForgetPwdEmail = async (username) => {
        const data = await sendForgetPwdEmailApi(username);
        runInAction(() => {
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            }
            else {
                Toast.info(`提交成功，我们将发送邮件到您的邮箱（${username}），请查收`, 1, () => {
                    startLoginScreen();
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
        console.log(response);

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
        alert('取消', '确定取消修改地址信息吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: async () => {
                const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
                const status = await cancelSaveAddressApi({ session_id, company_code, empn_no, enable_ta, staff_no });
                if(status && status.result == 'OK'){
                    Toast.success('取消修改地址信息成功！', 1);
                    this.getAddressInfo();
                    return true;
                }else{
                    Toast.fail(status.resultdesc, 1);
                    return false;
                }
            } },
        ])
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
            if(info.is_default == '1'){
                arr.unshift({
                    value: info.approver_id,
                    label: info.approver_name,
                })
            }else{
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
    saveSelfInfo = async (userInfo) => {
        alert('提交', '确定修改个人信息吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: async () => {
                const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
                const obj = merged(userInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
                const status = await submitUserInfoApi(obj);
                if(status && status.result == 'OK'){
                    Toast.success('修改个人信息成功！请等待审核', 1);
                    this.getPersonDetail();
                    return true;
                }else{
                    Toast.fail(status.resultdesc, 1);
                    return false;
                }
            } },
        ])
    }

    @action
    //保存个人地址
    saveSelfAddress = async (addressInfo) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(addressInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await saveSelfAddressApi(obj);
        if(status && status.result == 'OK'){
            Toast.success('修改家庭地址成功！请等待审核', 1);
        }else{
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
        alert('取消', '确定取消修改个人信息吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: async () => {
                const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
                const status = await cancelPersonalApi({ session_id, company_code, empn_no, enable_ta, staff_no });
                if(status && status.result == 'OK'){
                    Toast.success('取消提交修改个人信息成功！', 1);
                    this.getPersonDetail();
                    return true;
                }else{
                    Toast.fail(status.resultdesc, 1);
                    return false;
                }
            } },
        ])
    }

    @action
    //添加联系人信息
    addRelationFn = async (RelationInfo) => {
        const {is_save} = RelationInfo;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(RelationInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await addRelationApi(obj);
        if(status && status.result == 'OK'){
            if(is_save == '0'){
                Toast.success('提交联系人成功！请等待审核！', 1);
            }else{
                Toast.success('添加联系人成功！请等待审核！', 1);
            }
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //设置选中的联系人信息
    setCheckedPerson = (info) => {
        console.log(info)
        this.selectPerson = info;
    }

    @action
        //添加联系人信息
    saveRelationFn = async (RelationInfo) => {
        const {is_save} = RelationInfo;
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = merged(RelationInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await saveRelationApi(obj);
        if(status && status.result == 'OK'){
            if(is_save == '0'){
                Toast.success('提交联系人成功！请等待审核！', 1);
            }else{
                Toast.success('添加联系人成功！请等待审核！', 1);
            }
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //获取个人的证件信息
    getIdentity = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getIdentityApi(obj);
        console.log(data)

        if (data && data.result == 'OK') {
            this.selfIdentity = data.resultdata;
        }
    }

    @action
    //保存个人信息
    saveIdentity = async (obj) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const user = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = merged(obj, user);
        const status = await saveIdentityApi(data);
        if(status && status.result == 'OK'){
            Toast.success('提交证件信息成功！请等待审核！', 1);
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //保存个人证件信息
    saveCardInfo = async (obj) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const user = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const pic = obj.attachment;
        //图片文件上传
        const resData = await fileUploadApi({
            user_id: staff_no,
            session_id,
            pic,
            file_folder: 'Person_Photo',
            pic_suffix: 'jpg'
        });
        const data = merged(obj, user, {attachment: resData.resultdata.url});
        const status = await saveBankInfoApi(data);
        if(status && status.result == 'OK'){
            Toast.success('提交银行信息成功！请等待审核！', 1);
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //获取工作列表
    getWorkList = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await getWorkListApi(obj);
        if(status && status.result == 'OK') {
            this.selfWorkList = status.resultdata;
        }
    }

    @action
    //新增工作经历
    addWorkExp = async (reqData) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await addExperienceApi(merged(obj, reqData));
        if(status && status.result == 'OK') {
            const {is_save} = reqData;
            if(is_save == '0') {
                Toast.success('提交工作经历成功！请等待审核！', 1);
            }else {
                Toast.success('保存工作经历成功！', 1);
            }
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //设置选中的工作经历
    setCheckedExp = (info) => {
        this.selectExp = info;
    }

    @action
    //修改工作经历
    editWorkExp = async (reqData) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await changeExperienceApi(merged(obj, reqData));
        console.log(merged(obj, reqData))
        if(status && status.result == 'OK') {
            const {is_save} = reqData;
            if(is_save == '0'){
                Toast.success('修改提交工作经历成功！请等待审核！', 1);
            }else{
                Toast.success('修改保存工作经历成功！', 1);
            }
            return true;
        }else{
            Toast.fail(status.resultdesc, 1);
            return false;
        }
    }

    @action
    //获取教育经历
    getEduList = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await getEduListApi(obj);
        if(status && status.result == 'OK') {
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
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const status = await getEduListApi(obj);
        if(status && status.result == 'OK') {
            this.selfCertList = status.resultdata;
        }
    }
}

export default new User();