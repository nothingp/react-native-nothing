// @flow
import { Toast } from 'antd-mobile';
import { action, observable, runInAction } from 'mobx';

//页面提醒
import { persist } from 'mobx-persist';

import { loginApi } from '../services/baseService';

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
            } else {
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