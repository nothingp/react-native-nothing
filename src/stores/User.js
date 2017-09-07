// @flow

import {observable, action, runInAction} from 'mobx';
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

//页面跳转
import {startTabsScreen} from '../screens';

export default class User {

    constructor(Base){
        this.Base = Base;
    }

    Base = null;

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
            this.Base.userInfo = null;
            this.userDetail = '';
            this.alertsListData = '';
            this.sendForgetPwdEmailData = '';
        });
    }

    @action
    alertsList = async () => {
        const data = await alertsListApi(this.Base.userInfo.staff_no, this.Base.userInfo.session_id);
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
        const {session_id, company_code, empn_no, enable_ta, staff_no} = this.Base.userInfo;
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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.Base.userInfo;

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
        this.personalInfo.user_photo ='data:image/jpg;base64,' + response.data;
        //调用上传头像的接口
        try {
            const {session_id, staff_no} = this.Base.userInfo;
            const pic = "";

            const data = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic,
                file_folder:'Person_Photo',
                pic_suffix:'jpg'
            });

            runInAction(() => {
            })
        } catch (err) {

        }
    }

    @action
        //请求用户地址信息
    getAddressInfo = async () => {
        try {
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.Base.userInfo;

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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.Base.userInfo;

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
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.Base.userInfo;

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

// export default new Store();