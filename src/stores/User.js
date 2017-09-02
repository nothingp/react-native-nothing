// @flow

import { observable, action, runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import { loginApi, alertsListApi, resetPwdApi, personalDataApi} from '../services/baseService'
import { Toast } from 'antd-mobile';
import { create, persist } from 'mobx-persist'

class Store {
    @observable userInfo = null

    @observable userDetail = ''; //保存用户详细信息

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
        const {user_id, session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
        const data = await personalDataApi({user_id, session_id, company_code, empn_no, enable_ta, staff_no});
        runInAction(() => {
            console.log('data', data);
            this.resetPwd = data.resultdata
        });
    }

    @action
        //获取用户详细个人信息
    getPersonDetail = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
        const data = await personalDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
        runInAction(() => {
            this.userDetail = data.resultdata
        });
    }
}

export default new Store();