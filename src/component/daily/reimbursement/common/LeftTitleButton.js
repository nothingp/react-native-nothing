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
                txt = '';
                break;
            case 'S':
                txt = '删除';
                break;
            case 'C':
                txt = '重新编辑';
                break;
            case 'R':
                txt = '重新编辑';
                break;
            case 'A':
                txt = '';
                break;
            case 'create':
                txt = '';
                break;
        }
        return txt;
    }

    cancelFn = () => {
        const { info, True } = this.props;
        const { claimsCancelApiAction, claimsDetailsApplyApiAction } = True;
        this.refs.confirm.show(
            {
                title: '取消',
                massage: '是否取消此报销申请？',
                okFn: () => {
                    claimsCancelApiAction(
                        info.claim_id,
                        () => {
                            claimsDetailsApplyApiAction();
                        }
                    );
                },
            }
        );
    }

    deleteFn = () => {
        const { info, True } = this.props;
        const { claimsRemoveApiAction, claimsDetailsApplyApiAction } = True;
        this.refs.confirm.show(
            {
                title: '删除',
                massage: '是否删除此报销申请？',
                okFn: () => {
                    claimsRemoveApiAction(
                        info.claim_id,
                        () => {
                            claimsDetailsApplyApiAction();
                        }
                    );
                },
            }
        );
    }

    reApply = () => {
        const { True } = this.props;
        const { claimsDetailsApplyApiAction } = True;
        claimsDetailsApplyApiAction(() => {
            let { navigation } = this.props;
            navigation.navigate('ClaimsDetailApply');
        });
    }

    render() {
        const { info } = this.props;
        const status = info.status;
        if (status != 'A' || status != 'P' || status != 'create') {
            return (
                <View>
                    <Button
                        type="primary"
                        style={styles.button}
                        onPressIn={
                            () => {
                                status == 'S' ?
                                    this.deleteFn() :
                                    status == 'N' ?
                                        this.cancelFn() :
                                        this.reApply()

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


