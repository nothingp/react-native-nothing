// @flow

import { observable, action } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import {loginApi} from '../services/baseService'
import { Toast} from 'antd-mobile';

class Store {
    @observable userInfo = 0;

    @loading
    @action
    login(account,passwd) {
        loginApi(account,passwd)
    }
}

export default new Store();