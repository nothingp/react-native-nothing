import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
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
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User')
@observer
class Index extends Component {

    login() {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                Toast.loading('loading');
                await this.props.User.login(values.username, values.password);

            }
        });
    }

    render() {
        if(this.props.User.userInfo){
            Navigation.dismissModal({
                animationType: 'none'
            });
        }

        const { form, User, navigator } = this.props;
        const { getFieldProps } = form;
        return (
            <View style={styles.view}>

                <View style={styles.top}>
                    <Image source={require('../resource/banner.png')}/>
                </View>

                <View style={styles.form}>
                    <List>
                        <InputItem placeholder="用户名"
                                   {
                                       ...getFieldProps(
                                           'username',
                                           {
                                               rules: [
                                                   {
                                                       required: true
                                                   }
                                               ],
                                               initialValue: "chris.tseng@ecsoft.com.hk"
                                           }
                                       )
                                   }
                        >
                            <Icon type={'\ue66a'}/>
                        </InputItem>
                        <InputItem placeholder="密码" type="password"
                                   {
                                       ...getFieldProps(
                                           'password',
                                           {
                                               rules: [
                                                   {
                                                       required: true
                                                   }
                                               ],
                                               initialValue: "1111111"
                                           }
                                       )
                                   }
                        >
                            <Icon type={'\ue67b'}/>
                        </InputItem>
                        <InputItem placeholder="验证码" type="number"
                                   {
                                       ...getFieldProps(
                                           'captcha',
                                           {
                                               rules: [
                                                   {
                                                       required: true
                                                   }
                                               ],

                                               initialValue: "33rr"
                                           }
                                       )
                                   }
                        >
                            <Icon type={'\ue6ea'}/>
                        </InputItem>
                    </List>
                </View>

                <WingBlank>
                    <Button style={styles.button} type="primary" onPressIn={() => this.login()}>
                        登录
                    </Button>
                </WingBlank>

                <View style={styles.viewAddr}>
                    <Text style={styles.text}>
                        系统地址
                    </Text>
                </View>

                <View style={styles.viewPwdWithLan}>
                    <Text style={styles.text} onPress={() => navigator.push({
                        screen: 'ForgetPwd',
                        title: '忘记密码'
                    })}>
                        忘记密码
                    </Text>
                    <Text style={styles.text}>
                        切换语言
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: '#58cb8c'
    },
    top: {
        height: 190,
        backgroundColor: '#58cb8c'
    },
    form: {
        backgroundColor: '#fff'
    },
    button: {
        height: 50,
        borderRadius: 3,
        marginTop: 45,
        marginBottom: 20,
        backgroundColor: '#3ba662',
        borderColor: 'transparent'
    },
    viewAddr: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 50,
        paddingRight: 15,
    },
    viewPwdWithLan: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        position: 'absolute',
        left: 0,
        bottom: 30,
    },
    text: {
        color: '#fff',
        fontSize: 16
    },
});

export default createForm()(Index);

