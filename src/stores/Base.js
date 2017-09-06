// @flow

import {action, observable, runInAction} from 'mobx';
//页面提醒
import {persist} from 'mobx-persist';

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

//页面跳转

class Base {
    @persist @observable userInfo = null

    @action
    login = async (username, password) => {
        const data = await loginApi(username, password);
        runInAction(() => {
            //数据请求完成进行页面跳
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
                //this.loginError = data.resultdesc;
                // Toast.fail(data.resultdesc,3)
            } else {
                this.userInfo = data.resultdata
            }
        })
    }


}

export default new Base();