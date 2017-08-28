import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { startTabsScreen } from '../screens';
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

    showTab() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Toast.loading('loading', 0);
                this.props.User.login(values.username, values.password);
            }
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        if (this.props.User.userInfo) {
            startTabsScreen();
        }
        return (
            <View style={styles.view}>

                <View style={styles.top}>
                    <Image
                        //style={styles.img}
                        source={require('../resource/test.png')}
                    />
                    {/*<Text style={styles.text}>*/}
                        {/*hk*/}
                    {/*</Text>*/}
                </View>

                <View style={styles.form}>
                    <InputItem
                        {
                            ...getFieldProps(
                                'username',
                                {
                                    initialValue: "0005@ecsoft.com.hk"
                                }
                            )
                        }
                    >
                        手机号码
                    </InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'password',
                                {
                                    initialValue: "1111111"
                                }
                            )
                        }
                        type="password"
                    >
                        密码
                    </InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'captcha',
                                {
                                    initialValue: "33rr"
                                }
                            )
                        }
                    >
                        验证码
                    </InputItem>
                </View>

                <WingBlank>
                    <Button style={styles.button} type="primary" onPressIn={() => this.showTab()}>
                        登录
                    </Button>
                </WingBlank>

                <View style={styles.viewAddr}>
                    <Text style={styles.text}>
                        系统地址
                    </Text>
                </View>

                <View style={styles.viewPwdWithLan}>
                    <Text style={styles.text}>
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
        height: 170,
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

