/**
 * 银行卡title button
 */
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
        const bankCard = this.props.User.bankCard;
        let status = '';
        if (bankCard) {
            status = bankCard.status;
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
                                        massage: '确定取消修改银行卡信息吗？',
                                        okFn: () => {
                                            this.props.User.cancelChangeCard();
                                        },
                                    }
                                );
                            }}
                    >
                        取消
                    </Button>
                    <ShowConfirm ref="confirm"/>
                </View>
            )
        } else if (status == 'A' || status == 'R' || status == '') {
            return (
                <Button
                    type="primary"
                    style={styles.button}
                    onPressIn={() => this.props.navigation.navigate('EditCard')}
                >
                    编辑
                </Button>
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

