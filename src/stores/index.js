// @flow

import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';


import Counter from './Counter';
import User from './User';

const hydrate = create({ storage: AsyncStorage });

const stores = {
    Counter,
    User
}

// you can hydrate stores here with mobx-persist
//hydrate('User', stores.User);

export default {
    ...stores
};