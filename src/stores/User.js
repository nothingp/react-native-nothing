// @flow

import { observable, action } from 'mobx';
import {loading} from '../decorators/loading';
import {log} from '../decorators/log';
import {loginApi} from '../services/baseService'
import { Toast} from 'antd-mobile';

class Store {
    @observable userInfo = 0;

    @action login(account,passwd) {

         loginApi(account,passwd)
         Toast.hide();
    }
}

export default new Store();