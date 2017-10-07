import { Navigation } from 'react-native-navigation';

import Message from '../component/message';
import MsgDetail from '../component/message/msgDetail';
import Task from '../component/task';
import Approving from '../component/task/approving';
import ContactInfo from '../component/task/contactInfo';
import AddressApply from '../component/task/addressApply';
import EducationApply from '../component/task/educationApply';
import IdentityApply from '../component/task/identityApply';
import BankAccountApply from '../component/task/bankAccountApply';
import CertificateApply from '../component/task/certificateApply';
import ExperienceApply from '../component/task/experienceApply';
import Daily from '../component/daily';
import Me from '../component/personal';
import SelfInfo from '../component/personal/selfInfo';
import ForgetPwd from '../component/login/forgetPwd';
import SystemAddr from '../component/login/systemAddr';
import Result from '../component/result';
import Login from '../component/login';
import ChangePass from '../component/login/changePass';
import Test from '../component/test';
import Address from '../component/personal/address';
import EditAddress from '../component/personal/editAddress';
import EditSelfInfo from '../component/personal/editSelfInfo';
import SubmitSuc from '../component/personal/submitSuc';
import RelationShip from '../component/personal/relationship';
import EditRelation from '../component/personal/editRelation';
import AddRelation from '../component/personal/addRelation';
import Version from '../component/version';
import Card from '../component/personal/card';
import Credential from '../component/personal/credentials';
import EditCard from '../component/personal/editCard';
import EditCred from '../component/personal/editCredent';
import { gColors } from '../common/GlobalContants'

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    Navigation.registerComponent('Message', () => Message, store, Provider);
    Navigation.registerComponent('MsgDetail', () => MsgDetail, store, Provider);
    Navigation.registerComponent('Task', () => Task, store, Provider);
    Navigation.registerComponent('Approving', () => Approving, store, Provider);
    Navigation.registerComponent('ContactInfo', () => ContactInfo, store, Provider);
    Navigation.registerComponent('AddressApply', () => AddressApply, store, Provider);
    Navigation.registerComponent('EducationApply', () => EducationApply, store, Provider);
    Navigation.registerComponent('IdentityApply', () => IdentityApply, store, Provider);
    Navigation.registerComponent('BankAccountApply', () => BankAccountApply, store, Provider);
    Navigation.registerComponent('CertificateApply', () => CertificateApply, store, Provider);
    Navigation.registerComponent('ExperienceApply', () => ExperienceApply, store, Provider);
    Navigation.registerComponent('Daily', () => Daily, store, Provider);
    Navigation.registerComponent('Me', () => Me, store, Provider);
    Navigation.registerComponent('SelfInfo', () => SelfInfo, store, Provider);
    Navigation.registerComponent('ForgetPwd', () => ForgetPwd, store, Provider);
    Navigation.registerComponent('SystemAddr', () => SystemAddr, store, Provider);
    Navigation.registerComponent('Result', () => Result, store, Provider);
    Navigation.registerComponent('Login', () => Login, store, Provider);
    Navigation.registerComponent('ChangePass', () => ChangePass, store, Provider);
    //查看地址
    Navigation.registerComponent('Address', () => Address, store, Provider);
    //编辑个人地址
    Navigation.registerComponent('EditAddress', () => EditAddress, store, Provider);
    //编辑个人信息
    Navigation.registerComponent('EditSelfInfo', () => EditSelfInfo, store, Provider);
    //编辑成功页面
    Navigation.registerComponent('SubmitSuc', () => SubmitSuc, store, Provider);
    //查看联系人
    Navigation.registerComponent('RelationShip', () => RelationShip, store, Provider);
    //新增联系人
    Navigation.registerComponent('AddRelation', () => AddRelation, store, Provider);
    //编辑联系人
    Navigation.registerComponent('EditRelation', () => EditRelation, store, Provider);
    //查看银行卡信息
    Navigation.registerComponent('Card', () => Card, store, Provider);
    //编辑银行卡信息
    Navigation.registerComponent('EditCard', () => EditCard, store, Provider);
    //查看证件信息
    Navigation.registerComponent('Credential', () => Credential, store, Provider);
    //编辑证件信息
    Navigation.registerComponent('EditCred', () => EditCred, store, Provider);

    Navigation.registerComponent('Test', () => Test, store, Provider);
    Navigation.registerComponent('Version', () => Version, store, Provider);
}

export function startLoginScreen() {
    Navigation.showModal({
        screen: "Login",
        //animationType: 'none',
        navigatorStyle: {
            navBarHidden: true
        }
    });

}

export function startTabsScreen() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: '消息中心',
                screen: 'Message', // this is a registered name for a screen
                icon: require('../resource/tabs/message_01.png'),
                selectedIcon: require('../resource/tabs/message_02.png'),
                title: '消息中心'
            },
            {
                label: '任务',
                screen: 'Task', // this is a registered name for a screen
                icon: require('../resource/tabs/task_01.png'),
                selectedIcon: require('../resource/tabs/task_02.png'),
                title: '任务'
            },
            {
                label: '日常管理',
                screen: 'Daily', // this is a registered name for a screen
                icon: require('../resource/tabs/daily_01.png'),
                selectedIcon: require('../resource/tabs/daily_02.png'),
                title: '日常管理'
            },
            {
                label: '个人中心',
                screen: 'Me',
                icon: require('../resource/tabs/personal_01.png'),
                selectedIcon: require('../resource/tabs/personal_02.png'),
                title: '个人中心'
            }
        ],
        tabsStyle: {
            tabBarSelectedButtonColor: gColors.brandPrimary,
        },
        appStyle: {
            tabBarSelectedButtonColor: gColors.brandPrimary,
            forceTitlesDisplay: true,
            tabBarTranslucent: false,
        }
    })
}