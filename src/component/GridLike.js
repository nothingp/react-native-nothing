import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';

export default class Index extends Grid {
    getFlexItemStyle = () => {
        return {
            height: (Dimensions.get('window').height - 150) / 4,
            width: Dimensions.get('window').width / 2,
            borderRightWidth: this.props.hasLine ? 1 : 0
        }
    }
}

