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
        const selectLvDetail = this.props.User.selectLvDetail;
        let status = '';
        if (selectLvDetail) {
            status = selectLvDetail.status;
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
                                        massage: '确定取消该假期申请吗？',
                                        okFn: () => {
                                            this.props.User.cancelApplyHoliday();
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
                            this.props.navigation.navigate('ApplyHoliday', {type: 'edit'})
                        }
                    }
                >
                    重新编辑
                </Button>
            )
        }
        else if(status == 'A'){
            return(
                <Button
                    type="primary"
                    style={styles.button}
                    onPressIn={
                        () => {
                            this.props.navigation.navigate('EditAddress')
                        }
                    }
                >
                    取消假期
                </Button>
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

