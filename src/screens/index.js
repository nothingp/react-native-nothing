import {
    Platform
} from 'react-native';
import Message from '../component/message';
import MsgDetail from '../component/message/msgDetail';
import Task from '../component/task';
import LeaveAwardList from '../component/daily/leaveAwardList';
import RecentLeaveList from '../component/task/recentLeaveList';
import Notice from '../component/daily/notice';
import NoticeDetail from '../component/daily/notice/noticeDetail';
import LeaveLeaveBalance from '../component/daily/leaveLeaveBalance';
import LeaveAwardApply from '../component/task/leaveAwardApply';
import LeaveLeaveInfo from '../component/task/leaveLeaveInfo';
import ClaimsApply from '../component/task/claimsApply';
import UserInfoApply from '../component/task/userInfoApply';
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
import Test from '../component/test';
import Address from '../component/personal/address';
import EditAddress from '../component/personal/editAddress';
import EditSelfInfo from '../component/personal/editSelfInfo';
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
//我的假期首页
import MyHoliday from '../component/daily/myHoliday';
//申请假期
import ApplyHoliday from '../component/daily/applyHoliday';
//假期详情
import HolidayDetail from '../component/daily/holidayDetail';
//可调休假
import JustHoliday from '../component/daily/justHoliday';
//申报休假
import DeclareHoliday from '../component/daily/declareHoliday';
//调休申报详情
import DeclareDetail from '../component/daily/declareDetail';
//证书信息列表
import Certificates from '../component/personal/certificates';
//编辑证书信息
import EditCert from '../component/personal/editCert';
//更新版本
import Version from '../component/personal/version';
//取消假期
import CancelHoliday from '../component/daily/cancelHoliday';

//修改密码
import ResetPwd from '../component/personal/resetPwd';

//我的报销
import Reimbursement from '../component/daily/reimbursement/index'
import AddClaims from '../component/daily/reimbursement/addClaims'
import MyPayslip from '../component/daily/payslip/myPayslip';
import PdfView from '../component/daily/payslip/pdfView';
import PdfWebView from '../component/daily/payslip/pdfWebView';
import ClaimsDetail from '../component/daily/reimbursement/claimsDetail';
import ClaimsDetailApply from '../component/daily/reimbursement/claimsDetailApply';
import ClaimsItemDetail from '../component/daily/reimbursement/claimsItemDetail';
import ShowList from '../component/daily/reimbursement/showList';

import { gColors } from '../common/GlobalContants'
import { StackNavigator, TabNavigator } from 'react-navigation';

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    const AdminMain = startTabsScreen("1");
    const Main = startTabsScreen("0");

    const DailyAdminMain = startTabsScreen('1', 'Daily');
    const DailyMain = startTabsScreen('0', 'Daily');

    let components = {
        Main,
        AdminMain,
        DailyMain,
        DailyAdminMain,
        LeaveAwardApply,
        LeaveAwardList,
        MsgDetail,
        UserInfoApply,
        ApprovedManList,
        ContactInfo,
        LeaveLeaveInfo,
        AddressApply,
        EducationApply,
        IdentityApply,
        BankAccountApply,
        CertificateApply,
        ExperienceApply,

        Message,
        Daily,
        Task,
        Me,

        SelfInfo,
        ForgetPwd,
        SystemAddr,
        Result,
        Login,
        Address,
        EditAddress,
        EditSelfInfo,
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
        Notice,
        NoticeDetail,
        LeaveLeaveBalance,
        RecentLeaveList,
        Version,
        MyHoliday,
        ClaimsApply,
        ResetPwd,
        ApplyHoliday,
        Reimbursement,
        AddClaims,
        MyPayslip,
        PdfView,
        ClaimsDetail,
        ClaimsDetailApply,
        ClaimsItemDetail,
        ShowList,
        PdfWebView,
        HolidayDetail,
        JustHoliday,
        DeclareHoliday,
        DeclareDetail,
        CancelHoliday
    };

    let stackNavigatorConfig = {};
    for (var key of Object.keys(components)) {
        stackNavigatorConfig[key] = { screen: components[key] }
    }

    return StackNavigator(stackNavigatorConfig, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: gColors.brandPrimary
            },
            headerTitleStyle:{
                fontSize:14
            },
            headerBackTitleStyle:{
                fontSize:14
            },
            headerTintColor: '#fff',
            cardStyle: {
                backgroundColor: '#fff', // TabBar 背景色
            },
        },
        initialRouteName: 'Login'
    });
}

export function startTabsScreen(isManager, initialRouteName = 'Message') {

    let tabs = {
        Message: { screen: Message },
        Task: { screen: Task },
        Daily: { screen: Daily },
        Me: { screen: Me },
    }

    //非管理员用户登录后，隐藏“任务”那个tab（“is_manager”=1爲管理員，爲0爲非管理员）
    if (isManager == '0') {
        delete tabs.Task
    }

    let config = {
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
                backgroundColor: '#fff', // TabBar 背景色
            },
            // labelStyle: {
            //     fontSize: 10, // 文字大小
            // },
            // tabStyle: {
            //     width: 100,
            // },
            iconStyle:{
                width: 40,
            }
        },
        initialRouteName
    }

    //设置tab的高度
    if (Platform.OS == 'android') {
        config.tabBarOptions.style.height = 63;
    }

    return TabNavigator(tabs, config);
}

