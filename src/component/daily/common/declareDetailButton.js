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
import ShowConfirm from '../../../component/ShowConfirm';

@inject('User', 'Base')
@observer
export default class Index extends Component {

    render() {
        const selectAdjDetail = this.props.User.selectAdjDetail;
        let status = '';
        if (selectAdjDetail) {
            status = selectAdjDetail.status;
        }
        if (status == 'N') {
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
                                        massage: '确定取消该可调休申请吗？',
                                        okFn: () => {
                                            this.props.User.cancelApplyAdj();
                                        },
                                    }
                                );
                            }
                        }
                    >
                        取消申请
                    </Button>
                    <ShowConfirm ref="confirm"/>
                </View>
            )
        } else if (status == 'C' || status == 'R') {
            return (

                <Button
                    type="primary"
                    style={styles.button}
                    onPressIn={
                        () => {
                            this.props.navigation.navigate('DeclareHoliday', {type: 'edit'})
                        }
                    }
                >
                    重新编辑
                </Button>
            )
        }
        return null;
    }
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: '#3ba662',
        // borderColor: '#3ba662',
        height: 40
    }
});

