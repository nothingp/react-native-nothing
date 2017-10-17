import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {
    Flex,
    Toast,
    Icon,
    ActivityIndicator,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    WingBlank,
    WhiteSpace,
    TextareaItem
} from 'antd-mobile';
import {createForm} from 'rc-form';
import { observable, action, runInAction, computed, autorun } from 'mobx';
//import {Navigation} from 'react-native-navigation';
import {inject, observer} from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

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
                onPressIn={() => this.props.User.cancelChangeInfo()}
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

