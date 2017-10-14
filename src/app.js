import React, { Component } from 'react';
import 'antd-mobile';
import { registerScreens,startLoginScreen, startTabsScreen } from './screens';
import Provider       from './util/MobxRnnProvider';
import Stores         from './stores';

import Message from './component/message';
import Personal from './component/personal';
import SelfInfo from './component/personal/selfInfo';

import {
    AppRegistry,
    Text,
} from 'react-native';

//registerScreens(Stores,Provider); // this is where you register all of your app's screens

//startLoginScreen();
//startTabsScreen();

const App = registerScreens();

class Root extends React.Component {
    render() {
        return (
            <Provider store={Stores}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('nothing', () => Root);

