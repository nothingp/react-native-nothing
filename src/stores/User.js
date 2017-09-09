// @flow

import {observable, action, runInAction,computed,autorun} from 'mobx';
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
    personalPhotoApi
} from '../services/baseService'
//页面提醒
import {Toast} from 'antd-mobile';
import {create, persist} from 'mobx-persist'
import Base from './Base'

//页面跳转
import {startTabsScreen} from '../screens';

class User {
    @observable userDetail = ''; //保存用户详细信息

    @observable personalInfo = ''; //保存用户名字， 头像， 职位

    @observable addressInfo = ''; //保存用户地址信息

    @observable relationShipInfo = ''; //保存紧急联系人信息

    @observable bankCard = ''; //保存银行卡信息

    @observable alertsListData = ''; //用户消息列表

    @observable sendForgetPwdEmailData = ''; //忘记密码发送邮件返回数据

    //@observable loginError = ''; //登录错误的失败信息

    @action
    logout = async () => {
        runInAction(() => {
            Base.userInfo = null;
            this.userDetail = '';
            this.alertsListData = '';
            this.sendForgetPwdEmailData = '';
        });
    }

    // @computed async get alertsList () {
    //     const {session_id,staff_no} = Base.userInfo;
    //     const data = await alertsListApi({session_id,staff_no, user_id: staff_no});
    //     return data.resultdata;
    // }

    @action
    alertsList = async () => {
        const {session_id,staff_no} = Base.userInfo;
        const data = await alertsListApi({session_id,staff_no, user_id: staff_no});
        runInAction(() => {
            console.log('data', data);
            this.alertsListData = data.resultdata
        });
    }

    @action
    sendForgetPwdEmail = async (username) => {
        const data = await sendForgetPwdEmailApi(username);
        runInAction(() => {
            console.log('data', data);
            this.sendForgetPwdEmailData = data;
        });
    }

    @action
        //获取用户详细个人信息
    getPersonDetail = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;

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
            const {session_id, staff_no,company_code, empn_no, enable_ta} = Base.userInfo;
            const pic = response.data;

            const data = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic,
                file_folder:'Person_Photo',
                pic_suffix:'jpg'
            });

            this.personalInfo.user_photo =data.resultdata.url;

            const result = await personalPhotoApi({
                user_id: staff_no,
                session_id,
                company_code,
                empn_no,
                enable_ta,
                staff_no,
                user_photo:data.resultdata.url
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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;

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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;

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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;

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
}

export default new User();