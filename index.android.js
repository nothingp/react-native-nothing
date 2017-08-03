import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
    tabs: [
        {
            label: '消息中心',
            screen: 'Home', // this is a registered name for a screen
            icon:  require('./src/resource/ic_back_dark.png'),
            // selectedIcon: require('./src/resource/ic_back_dark.png'), // iOS only
            title: '消息中心'
        },
        {
            label: '任务',
            screen: 'Task', // this is a registered name for a screen
            icon:  require('./src/resource/ic_back_dark.png'),
            // selectedIcon: require('./src/resource/ic_back_dark.png'), // iOS only
            title: '任务'
        },
        {
            label: '日常管理',
            screen: 'Daily', // this is a registered name for a screen
            icon:  require('./src/resource/ic_back_dark.png'),
            // selectedIcon: require('./src/resource/ic_back_dark.png'), // iOS only
            title: '日常管理'
        },
        {
            label: '个人中心',
            screen: 'Me',
            icon: require('./src/resource/ic_back_dark.png'),
            // selectedIcon: require('./src/resource/ic_back_dark.png'), // iOS only
            title: '个人中心'
        }
    ]
});