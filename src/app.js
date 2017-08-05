import { Navigation } from 'react-native-navigation';
import { registerScreens,startLoginScreen } from './screens';
import Provider       from './util/MobxRnnProvider';
import Stores         from './stores';

registerScreens(Stores,Provider); // this is where you register all of your app's screens

startLoginScreen();