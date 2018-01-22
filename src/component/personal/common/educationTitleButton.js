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
        const selectEduItem = this.props.User.selectEduItem;
        let status = '';
        if (selectEduItem) {
            status = selectEduItem.status;
        }
        const successFn = () => {
            this.props.navigation.goBack();
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
                                        massage: '确定取消修改教育信息吗？',
                                        okFn: () => {
                                            this.props.User.cancelChangeEducation(successFn)
                                        },
                                    }
                                );
                            }
                        }
                    >
                        取消
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
        //backgroundColor: '#3ba662',
        //borderColor: '#3ba662',
        height: 40
    }
});

