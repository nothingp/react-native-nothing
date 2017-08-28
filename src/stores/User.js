// @flow

import { observable, action, runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import { loginApi, alertsListApi, resetPwdApi } from '../services/baseService'
import { Toast } from 'antd-mobile';
import { create, persist } from 'mobx-persist'

class Store {
    @observable userInfo = null

    @observable alertsList = null

    @observable resetPwd = null

    @action
    login = async (username, password) => {
        const data = await loginApi(username, password);
        runInAction(() => {
            console.log('123123123', data);
            this.userInfo = data.resultdata
        });
    }

    @action
    alertsList = async () => {
        const data = await alertsListApi(userInfo.staff_no, userInfo.session_id);
        runInAction(() => {
            console.log('data', data);
            this.alertsList = data.resultdata
        });
    }

    @action
    resetPwd = async () => {
        const data = await resetPwdApi(userInfo.staff_no, userInfo.session_id);
        runInAction(() => {
            console.log('data', data);
            this.resetPwd = data.resultdata
        });
    }
}

export default new Store();