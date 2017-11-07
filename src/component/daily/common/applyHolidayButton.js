/**
 * 我的假期顶部按钮
 */

import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Button,
} from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { showAlert } from '../../../component/showAlert';

export default class Index extends Component {

    render() {
        const selectExp = this.props.User.selectExp;
        let status = '';
        if(selectExp){
            status = selectExp.status;
        }
        if(status == 'N'){
            return (<Button
                type="primary"
                style={styles.button}
                onPressIn={() => {
                    showAlert({
                        title: '取消',
                        massage: '确定取消修改我的假期吗？',
                        okFn: () => {
                            this.props.User.cancelChangeWorkExp()
                        },
                    })
                }}
            >取消</Button>)
        }
        return null;
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#3ba662',
        borderColor: '#3ba662',
        height:40
    }
});

