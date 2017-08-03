import { Navigation } from 'react-native-navigation';

import Home from './home';
import Task from './task';
import Daily from './daily';
import Me from './me';
import SelfInfo from './selfInfo';
import Result from './result';

// register all screens of the app (including internal ones)
export function registerScreens(store: {}, Provider: {}) {
    Navigation.registerComponent('Home', () => Home,store, Provider);
    Navigation.registerComponent('Task', () => Task,store, Provider);
    Navigation.registerComponent('Daily', () => Daily,store, Provider);
    Navigation.registerComponent('Me', () => Me,store, Provider);
    Navigation.registerComponent('SelfInfo', () => SelfInfo,store, Provider);
    Navigation.registerComponent('Result', () => Result,store, Provider);
}