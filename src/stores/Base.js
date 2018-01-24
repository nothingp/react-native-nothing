// @flow
import { Toast } from 'antd-mobile';
import { action, observable, runInAction } from 'mobx';

//页面提醒
import { persist } from 'mobx-persist';

import { loginApi } from '../services/baseService';

//页面跳转
class Base {
    @observable userInfo = null

    @persist('object') @observable username = null; //持久化登录用户名

    @persist('object') @observable serverUrl = 'https://ess.echrss.com/intest'; //服务器地址

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
                this.username = username;
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