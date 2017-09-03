// @flow

import { observable, action, runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import { loginApi, alertsListApi, resetPwdApi, personalDataApi} from '../services/baseService'
import { Toast } from 'antd-mobile';
import { create, persist } from 'mobx-persist'

//页面跳转
import { startTabsScreen } from '../screens';

class Store {
    @observable userInfo = null

    @observable userDetail = ''; //保存用户详细信息

    @action
    login = async (username, password) => {
        const data = await loginApi(username, password);
        runInAction(() => {
            //数据请求完成进行页面跳转
            console.log('123123123', data);
            if(data.resultdata){
                startTabsScreen();
            }
            this.userInfo = data.resultdata
        });
    }

    @action
    logout = async () => {
        runInAction(() => {
            this.userInfo=null;
            this.userDetail='';
        });
    }

    @action
    alertsList = async () => {
        const data = await alertsListApi(this.userInfo.staff_no, this.userInfo.session_id);
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
            console.log('data', data);
            this.userDetail = data.resultdata
        });
    }
}

export default new Store();