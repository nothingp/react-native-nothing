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
    logOut=()=>{
        this.props.Base.logout();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'})
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (<Button
            type="primary"
            style={styles.button}
            onPressIn={() => this.logOut()}
        >退出</Button>)
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#3ba662',
        borderColor: '#3ba662',
    }
});

