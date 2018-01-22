import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
} from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

@inject('True')
@observer
export default class Index extends Component {

    render() {
        return (
            <Button
                type="primary"
                style={styles.button}
                activeStyle={styles.button}
                onPressIn={() => {
                    let { True, navigation } = this.props;
                    True.claimsDetails = {};
                    True.claimitemsList = [];
                    navigation.navigate('AddClaims');//"公告"
                }}
            >
                报销
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: '#3ba662',
        // borderColor: '#3ba662',
        height: 40
    }
});


