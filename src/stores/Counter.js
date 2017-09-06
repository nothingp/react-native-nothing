// @flow

import { observable, action } from 'mobx';

export default class Counter {

    constructor(Base){
        this.Base = Base;
    }

    Base = null;

    @observable count = 0;

    @action onPlus() {
        this.count += 1;
    }

    @action onMinus() {
        this.count -= 1;
    }

}

//export default new Store();