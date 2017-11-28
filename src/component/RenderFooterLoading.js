import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import BaseComponent from './BaseComponent';
import { gColors } from '../common/GlobalContants';

export default class Index extends BaseComponent {

    render() {
        const { isLoadingMore = true } = this.props;
        if (!isLoadingMore) {
            return (
                <View style={
                    [
                        styles.centering,
                        {
                            marginBottom: 20,
                            marginTop: 20,
                        }
                    ]
                }>
                    <Text>没有更多数据</Text>
                </View>
            )
        }
        else return (
            <ActivityIndicator
                style={
                    [
                        styles.centering,
                        { height: 80 }
                    ]
                }
                size="large"
                color={gColors.brandPrimaryTap}
            />
        )
    }
}

const styles = StyleSheet.create({
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

