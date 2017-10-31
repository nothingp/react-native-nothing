import React, { Component } from 'react';
import 'antd-mobile';
import { registerScreens } from './screens';
import Provider from './util/MobxRnnProvider';
import Stores from './stores';

import {
    AppRegistry,
    Text,
} from 'react-native';

const App = registerScreens();

class Root extends React.Component {
    render() {
        return (
            <Provider store={Stores}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('nothing', () => Root);

