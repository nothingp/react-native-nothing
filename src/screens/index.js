import { Navigation } from 'react-native-navigation';

import Home from '../component/message';
import Task from '../component/task';
import Daily from '../component/daily';
import Me from '../component/personal';
import SelfInfo from '../component/personal/selfInfo';
import ForgetPwd from '../component/login/forgetPwd';
import Result from '../component/result';
import Login from '../component/login';
import ChangePass from '../component/login/changePass';
import Test from '../component/test';
import Address from '../component/personal/address';
import EditAddress from '../component/personal/editAddress';
import EditSelfInfo from '../component/personal/editSelfInfo';
import RelationShip from '../component/personal/relationship';
import Version from '../component/version';
import Card from '../component/personal/card';
import {gColors} from '../common/GlobalContants'

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    Navigation.registerComponent('Home', () => Home,store, Provider);
    Navigation.registerComponent('Task', () => Task,store, Provider);
    Navigation.registerComponent('Daily', () => Daily,store, Provider);
    Navigation.registerComponent('Me', () => Me,store, Provider);
    Navigation.registerComponent('SelfInfo', () => SelfInfo,store, Provider);
    Navigation.registerComponent('ForgetPwd', () => ForgetPwd,store, Provider);
    Navigation.registerComponent('Result', () => Result,store, Provider);
    Navigation.registerComponent('Login', () => Login,store, Provider);
    Navigation.registerComponent('ChangePass', () => ChangePass,store, Provider);
    //查看地址
    Navigation.registerComponent('Address', () => Address,store, Provider);
    //编辑个人地址
    Navigation.registerComponent('EditAddress', () => EditAddress,store, Provider);
    //编辑个人信息
    Navigation.registerComponent('EditSelfInfo', () => EditSelfInfo,store, Provider);
    //查看紧急联系人
    Navigation.registerComponent('RelationShip', () => RelationShip,store, Provider);
    //查看银行卡信息
    Navigation.registerComponent('Card', () => Card,store, Provider);
    Navigation.registerComponent('Test', () => Test,store, Provider);
    Navigation.registerComponent('Version', () => Version,store, Provider);

}

export function startLoginScreen(){
    Navigation.showModal({
        screen: "Login",
        //animationType: 'none',
        navigatorStyle:{
            navBarHidden:true
        }
    });

}

export function startTabsScreen(){
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: '消息中心',
                screen: 'Home', // this is a registered name for a screen
                icon:  require('../resource/tabs/message_01.png'),
                selectedIcon:  require('../resource/tabs/message_02.png'),
                title: '消息中心'
            },
            {
                label: '任务',
                screen: 'Task', // this is a registered name for a screen
                icon:  require('../resource/tabs/task_01.png'),
                selectedIcon:  require('../resource/tabs/task_02.png'),
                title: '任务'
            },
            {
                label: '日常管理',
                screen: 'Daily', // this is a registered name for a screen
                icon:  require('../resource/tabs/daily_01.png'),
                selectedIcon:  require('../resource/tabs/daily_02.png'),
                title: '日常管理'
            },
            {
                label: '个人中心',
                screen: 'Me',
                icon:  require('../resource/tabs/personal_01.png'),
                selectedIcon:  require('../resource/tabs/personal_02.png'),
                title: '个人中心'
            }
        ],
        tabsStyle: {
            tabBarSelectedButtonColor:gColors.brandPrimary,
        },
        appStyle: {
            tabBarSelectedButtonColor:gColors.brandPrimary,
            forceTitlesDisplay:true,
            tabBarTranslucent: false,
        }
    })
}