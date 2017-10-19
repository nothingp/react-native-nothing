import Message from '../component/message';
import MsgDetail from '../component/message/msgDetail';
import Task from '../component/task';
import LightBoxScreen from '../component/task/lightBoxScreen';
// import CanlendarPage from '../component/task/canlendarPage';
import LeaveAwardApply from '../component/task/leaveAwardApply';
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
//import Version from '../component/version';
import Card from '../component/personal/card';
import Credential from '../component/personal/credentials';
import EditCard from '../component/personal/editCard';
import EditCred from '../component/personal/editCredent';
import WorkExp from '../component/personal/workExperience';
import EditWorkExp from '../component/personal/editWorkExp';
//教育经历
import EduExperience from '../component/personal/eduExperience';
//编辑新增教育经历
import EditEduExp from '../component/personal/editEducation';

//证书信息列表
import Certificates from '../component/personal/certificates';
//编辑证书信息
import EditCert from '../component/personal/editCert';

import { gColors } from '../common/GlobalContants'
import { StackNavigator, TabNavigator } from 'react-navigation';

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    const Main = startTabsScreen();

    let components = {
        Main,
        LightBoxScreen,
        LeaveAwardApply,
        MsgDetail,
        Task,
        Approving,
        ApprovedManList,
        ContactInfo,
        LeaveLeaveInfo,
        AddressApply,
        EducationApply,
        IdentityApply,
        BankAccountApply,
        CertificateApply,
        ExperienceApply,
        Daily,
        Me,
        SelfInfo,
        ForgetPwd,
        SystemAddr,
        Result,
        Login,
        ChangePass,
        Address,
        EditAddress,
        EditSelfInfo,
        SubmitSuc,
        RelationShip,
        EditRelation,
        Card,
        EditCard,
        Credential,
        EditCred,
        WorkExp,
        EditWorkExp,
        Test,
        EduExperience,
        EditEduExp,
        Certificates,
        EditCert,
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
}

export function startLoginScreen() {

}

export function startTabsScreen() {
    return TabNavigator(
        {
            Tab1: { screen: Message },
            Tab2: { screen: Task },
            Tab3: { screen: Daily },
            Tab4: { screen: Me },
        },
        {
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