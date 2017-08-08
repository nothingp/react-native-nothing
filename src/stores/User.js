// @flow

import { observable, action,runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import {loginApi} from '../services/baseService'
import { Toast} from 'antd-mobile';

class Store {
    @observable userInfo;

    @action
    login = async(username,password) =>  {
        const data = await loginApi(username,password);
        runInAction(() => {
            this.userInfo = data.resultdata
        });
    }
}

export default new Store();