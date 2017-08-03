// @flow

import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';


import Counter from './Counter';

const hydrate = create({ storage: AsyncStorage });

const stores = {
    Counter,
}

// you can hydrate stores here with mobx-persist
//hydrate('Counter', stores.Counter);

export default {
    ...stores
};