// @flow

import { observable, action, runInAction, computed, autorun } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import {
    loginApi,
    alertsListApi,
    resetPwdApi,
    personalDataApi,
    basisDataApi,
    personalInfoApi,
    addressInfoApi,
    relationShipApi,
    bankAccountApi,
    sendForgetPwdEmailApi,
    fileUploadApi,
    personalPhotoApi,
    approverApi,
    submitUserInfoApi
} from '../services/baseService'
//页面提醒
import { Toast } from 'antd-mobile';
//自己封装的工具库
import {merged} from '../common/Tool';

import { create, persist } from 'mobx-persist'
import Base from './Base'

//页面跳转
import { startTabsScreen, startLoginScreen } from '../screens';

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

    //@observable loginError = ''; //登录错误的失败信息

    constructor() {
        autorun(() => {
            if (!Base.userInfo) {
                // this.userDetail = [];
                // this.alertsListData = [];
                // this.sendForgetPwdEmailData = [];
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
            this.alertsListData = data.resultdata
        });
    }

    @action
    alertsDetail = (data) => {
        runInAction(() => {
            this.alertsDetailData = data;
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

            runInAction(() => {
                this.addressInfo = data.resultdata;
            })

        } catch (err) {
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
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        console.log(userInfo)
        Toast.loading('保存中...');
        const obj = merged(userInfo, { session_id, company_code, empn_no, enable_ta, staff_no });
        const status = await submitUserInfoApi(obj);
        Toast.hide();
        if(status && status.result == 'OK'){
            Toast.success('修改个人信息成功！', 1);
        }else{
            Toast.fail(status.resultdesc, 1);
        }
    }
}

export default new User();