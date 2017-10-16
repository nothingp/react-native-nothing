//import {Navigation} from 'react-native-navigation';

import Message from '../component/message';
import MsgDetail from '../component/message/msgDetail';
import Task from '../component/task';
import LightBoxScreen from '../component/task/lightBoxScreen';
import LeaveLeaveInfo from '../component/task/leaveLeaveInfo';
import Approving from '../component/task/approving';
import ApprovedManList from '../component/task/approvedManList';
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
//import Version from '../component/version';
import Card from '../component/personal/card';
import Credential from '../component/personal/credentials';
import EditCard from '../component/personal/editCard';
import EditCred from '../component/personal/editCredent';
import WorkExp from '../component/personal/workExperience';
import AddWorkExp from '../component/personal/addWorkExp';
//教育经历
import EduExperience from '../component/personal/eduExperience';
//编辑新增教育经历
import AddEduExp from '../component/personal/editEducation';

import { gColors } from '../common/GlobalContants'
import { StackNavigator, TabNavigator } from 'react-navigation';

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    const Main = startTabsScreen();

    let components = {
        Main, LightBoxScreen, MsgDetail, Task, Approving, ApprovedManList, ContactInfo, LeaveLeaveInfo,
        AddressApply, EducationApply, IdentityApply, BankAccountApply, CertificateApply, ExperienceApply,
        Daily, Me, SelfInfo, ForgetPwd, SystemAddr, Result, Login, ChangePass, Address, EditAddress,
        EditSelfInfo, SubmitSuc, RelationShip, AddRelation, EditRelation, Card, EditCard,
        Credential, EditCred, WorkExp, AddWorkExp, Test, EduExperience, AddEduExp
    };


    let stackNavigatorConfig = {};
    for (var key of Object.keys(components)) {
        stackNavigatorConfig[key] = { screen: components[key] }
    }

    return StackNavigator(stackNavigatorConfig, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: gColors.brandPrimary,
            },
            headerTintColor: '#fff',
            cardStyle: {
                backgroundColor: '#fff', // TabBar 背景色
            },
        },
        initialRouteName: 'Login'
    });

    // Navigation.registerComponent('Message', () => Message, store, Provider);
    // Navigation.registerComponent('MsgDetail', () => MsgDetail, store, Provider);
    // Navigation.registerComponent('LightBoxScreen', () => LightBoxScreen, store, Provider);
    // Navigation.registerComponent('Task', () => Task, store, Provider);
    // Navigation.registerComponent('Approving', () => Approving, store, Provider);
    // Navigation.registerComponent('ApprovedManList', () => ApprovedManList, store, Provider);
    // Navigation.registerComponent('ContactInfo', () => ContactInfo, store, Provider);
    // Navigation.registerComponent('AddressApply', () => AddressApply, store, Provider);
    // Navigation.registerComponent('EducationApply', () => EducationApply, store, Provider);
    // Navigation.registerComponent('IdentityApply', () => IdentityApply, store, Provider);
    // Navigation.registerComponent('BankAccountApply', () => BankAccountApply, store, Provider);
    // Navigation.registerComponent('CertificateApply', () => CertificateApply, store, Provider);
    // Navigation.registerComponent('ExperienceApply', () => ExperienceApply, store, Provider);
    // Navigation.registerComponent('Daily', () => Daily, store, Provider);
    // Navigation.registerComponent('Me', () => Me, store, Provider);
    // Navigation.registerComponent('SelfInfo', () => SelfInfo, store, Provider);
    // Navigation.registerComponent('ForgetPwd', () => ForgetPwd, store, Provider);
    // Navigation.registerComponent('SystemAddr', () => SystemAddr, store, Provider);
    // Navigation.registerComponent('Result', () => Result, store, Provider);
    // Navigation.registerComponent('Login', () => Login, store, Provider);
    // Navigation.registerComponent('ChangePass', () => ChangePass, store, Provider);
    // //查看地址
    // Navigation.registerComponent('Address', () => Address, store, Provider);
    // //编辑个人地址
    // Navigation.registerComponent('EditAddress', () => EditAddress, store, Provider);
    //编辑个人信息
    // Navigation.registerComponent('EditSelfInfo', () => EditSelfInfo, store, Provider);
    // //编辑成功页面
    // Navigation.registerComponent('SubmitSuc', () => SubmitSuc, store, Provider);
    // //查看联系人
    // Navigation.registerComponent('RelationShip', () => RelationShip, store, Provider);
    // //新增联系人
    // Navigation.registerComponent('AddRelation', () => AddRelation, store, Provider);
    // //编辑联系人
    // Navigation.registerComponent('EditRelation', () => EditRelation, store, Provider);
    // //查看银行卡信息
    // Navigation.registerComponent('Card', () => Card, store, Provider);
    // //编辑银行卡信息
    // Navigation.registerComponent('EditCard', () => EditCard, store, Provider);
    // //查看证件信息
    // Navigation.registerComponent('Credential', () => Credential, store, Provider);
    // //编辑证件信息
    // Navigation.registerComponent('EditCred', () => EditCred, store, Provider);
    // //工作经历
    // Navigation.registerComponent('WorkExp', () => WorkExp, store, Provider);
    // //添加工作经历
    // Navigation.registerComponent('AddWorkExp', () => AddWorkExp, store, Provider);
    //
    // Navigation.registerComponent('Test', () => Test, store, Provider);
    //Navigation.registerComponent('Version', () => Version, store, Provider);
}

export function startLoginScreen() {
    // Navigation.showModal({
    //     screen: "Login",
    //     //animationType: 'none',
    //     navigatorStyle: {
    //         navBarHidden: true
    //     }
    // });

}

export function startTabsScreen() {
    // Navigation.startTabBasedApp({
    //     tabs: [
    //         {
    //             label: '消息中心',
    //             screen: 'Message', // this is a registered name for a screen
    //             icon: require('../resource/tabs/message_01.png'),
    //             selectedIcon: require('../resource/tabs/message_02.png'),
    //             title: '消息中心'
    //         },
    //         {
    //             label: '任务',
    //             screen: 'Task', // this is a registered name for a screen
    //             icon: require('../resource/tabs/task_01.png'),
    //             selectedIcon: require('../resource/tabs/task_02.png'),
    //             title: '任务'
    //         },
    //         {
    //             label: '日常管理',
    //             screen: 'Daily', // this is a registered name for a screen
    //             icon: require('../resource/tabs/daily_01.png'),
    //             selectedIcon: require('../resource/tabs/daily_02.png'),
    //             title: '日常管理'
    //         },
    //         {
    //             label: '个人中心',
    //             screen: 'Me',
    //             icon: require('../resource/tabs/personal_01.png'),
    //             selectedIcon: require('../resource/tabs/personal_02.png'),
    //             title: '个人中心'
    //         }
    //     ],
    //     tabsStyle: {
    //         tabBarSelectedButtonColor: gColors.brandPrimary,
    //     },
    //     appStyle: {
    //         tabBarSelectedButtonColor: gColors.brandPrimary,
    //         forceTitlesDisplay: true,
    //         tabBarTranslucent: false,
    //     }
    // })
    return TabNavigator({
        Tab1: { screen: Message },
        Tab2: { screen: Task },
        Tab3: { screen: Daily },
        Tab4: { screen: Me },
    }, {
        animationEnabled: false, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        lazy: true,
        tabBarOptions: {
            activeTintColor: gColors.brandPrimary, // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                height: 63,
                backgroundColor: '#fff', // TabBar 背景色
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },
    });
}