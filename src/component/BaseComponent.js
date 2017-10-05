import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    Image
} from 'react-native';
import { Flex, WhiteSpace,Icon,Grid,Button,List,Result } from 'antd-mobile';
import {gColors} from '../common/GlobalContants'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent=(event)=> {
        this[event.id] &&  this[event.id](event);
        // switch(event.id) {
        //     case 'willAppear':
        //         this.componetWillAppear &&
        //         break;
        //     case 'didAppear':
        //         break;
        //     case 'willDisappear':
        //         break;
        //     case 'didDisappear':
        //         break;
        // }
    }

}
