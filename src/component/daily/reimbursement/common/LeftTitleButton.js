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
import { withNavigation } from 'react-navigation';
import { createForm } from 'rc-form';

import ShowConfirm from '../../../../component/ShowConfirm';

@inject('User', 'Base', 'True')
@observer
class Index extends Component {

    getBtnTxt = (type) => {
        let txt = '';
        switch (type) {
            case 0:
                txt = '取消';
                break;
            case 1:
                txt = '重新编辑';
                break;
            case 2:
                txt = '删除';
                break;
            case 3:
                txt = '';
                break;
            case 4:
                txt = '';
                break;
        }
        return txt;
    }

    render() {
        const { True, navigation, type } = this.props;
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
                        {this.getBtnTxt(type)}
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

export default withNavigation(createForm()(Index));


