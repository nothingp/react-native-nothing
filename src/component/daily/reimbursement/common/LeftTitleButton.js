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
import { createForm } from 'rc-form';

import ShowConfirm from '../../../../component/ShowConfirm';

@inject('User', 'Base', 'True')
@observer
export default class Index extends Component {

    getBtnTxt = (status) => {
        let txt = '';
        switch (status) {
            case 'N':
                txt = '取消';
                break;
            case 'P':
                txt = '重新编辑';
                break;
            case 'S':
                txt = '删除';
                break;
            case 'C':
                txt = '';
                break;
            case 'R':
                txt = '';
                break;
            case 'A':
                txt = '';
                break;
        }
        return txt;
    }

    render() {
        const { navigation, info, True } = this.props;
        const { claimsCancelApiAction } = True;
        const status = info && info.status;
        if (status == 'N') {//N P R C A S
            return (
                <View>
                    <Button
                        type="primary"
                        style={styles.button}
                        onPressIn={
                            () => {
                                this.refs.confirm.show(
                                    {
                                        title: '取消',
                                        massage: '确定取消修改报销申请吗？',//是否取消此报销申请//是否删除此报销申请
                                        okFn: () => {
                                            claimsCancelApiAction(info.claim_id, navigation.goBack);
                                        },
                                    }
                                );
                            }
                        }
                    >
                        {this.getBtnTxt(status)}
                    </Button>
                    <ShowConfirm ref="confirm"/>
                </View>
            )
        }
        return null;
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3ba662',
        borderColor: '#3ba662',
        height: 40
    }
});


