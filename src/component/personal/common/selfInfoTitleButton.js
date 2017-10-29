import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Button,
} from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import {inject, observer} from 'mobx-react/native';
import { showAlert } from '../../../component/showAlert';

@inject('User', 'Base')
@observer
export default class Index extends Component {

    render() {
        const userDetail = this.props.User.userDetail;
        let status = '';
        if(userDetail){
            status = userDetail.status;
        }
        if(status == 'N'){
            return (<Button
                type="primary"
                style={styles.button}
                onPressIn={() => {
                    showAlert({
                        title: '取消',
                        massage: '您确定取消修改个人信息吗？',
                        okFn: () => {
                            this.props.User.cancelChangeInfo()
                        },
                    })
                }}
            >取消</Button>)
        }else if (status == 'A' || status == 'R' || status == ''){
            return (<Button
                type="primary"
                style={styles.button}
                onPressIn={() => this.props.navigation.navigate('EditSelfInfo')}
            >编辑</Button>)
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

