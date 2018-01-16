// @flow
import { Toast } from 'antd-mobile';
import { action, observable, runInAction } from 'mobx';

//页面提醒
import { persist } from 'mobx-persist';

import { loginApi } from '../services/baseService';

//页面跳转
class Base {
    @persist @observable userInfo = null

    @observable serverUrl = 'https://ess.echrssc.com'; //服务器地址

    @action
    login = async (username, password, registrationId) => {
        Toast.loading('加载中');
        const data = await loginApi(username, password, 'CN', registrationId);
        runInAction(() => {
            //数据请求完成进行页面跳
            if (data.result == "ERR") {
                Toast.fail(data.resultdesc, 1);
            } else {
                Toast.hide();
                this.userInfo = data.resultdata;
            }
        })
    }

    @action
    logout = async () => {
        runInAction(() => {
            this.userInfo = null;
        });
    }

}

export default new Base();