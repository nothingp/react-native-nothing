import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { startTabsScreen } from '../screens';
import { Flex, Toast,Icon,ActivityIndicator,Button,List,NavBar,InputItem,Picker,TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User')
@observer
class Index extends Component {

    showTab(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Toast.loading('loading',0);
                this.props.User.login(values.username,values.password);
            }
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        if(this.props.User.userInfo){
            startTabsScreen();
        }
        return (
            <View style={styles.image}>
                <InputItem
                    {...getFieldProps('username',{initialValue:"0005@ecsoft.com.hk"})
                    }
                >手机号码</InputItem>
                <InputItem
                    {...getFieldProps('password',{initialValue:"1111111"})}
                    type="password"
                >密码</InputItem>
                <Button type="primary"  onPressIn={()=>this.showTab()}>登录</Button>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    image: {
        height:'100%'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height:15
    }
});

export default createForm()(Index);

