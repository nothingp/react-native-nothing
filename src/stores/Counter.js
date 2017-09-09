// @flow

import { observable, action } from 'mobx';
import Base from './Base';

class Counter {

    @observable count = 0;

    @action onPlus() {
        this.count += 1;
    }

    @action onMinus() {
        this.count -= 1;
    }

}

export default new Counter();