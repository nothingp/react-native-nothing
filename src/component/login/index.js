import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation'
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
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import JPushModule from 'jpush-react-native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Base')
@observer
class Index extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            captcha: '',
            captchaValue: '',
            captchaError: false,
            captchaErrorTxt: '',
        }
    }

    registrationId: ''

    componentWillMount() {
        this.changeCaptcha();
        autorun(() => {
            if (this.props.Base.userInfo) {
                let routeName = 'Main';
                if(this.props.Base.userInfo.is_manager=='1'){
                    routeName = 'AdminMain';
                }
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName })
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        })

        JPushModule.getRegistrationID((registrationId) => {
            console.log('registrationId', registrationId)
            this.registrationId = registrationId;
        })

        // JPushModule.getInfo((map) => {
        //     console.log('device',map)
        // });

        if (Platform.OS == 'android') {
            JPushModule.notifyJSDidLoad((resultCode) => {
                console.log('notifyJSDidLoad', resultCode)
            });
        }
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({ pushMsg: message });
        });
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: " + message);
        })
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!");
            console.log("map.extra: " + map.extras);
            const extras = JSON.parse(map.extras)
            // console.log(extras.type=='task');
            if (extras.type == 'task') {
                // console.log("task");
                this.props.navigation.navigate('Task');
            } else if (extras.type == 'Alert') {
                this.props.navigation.navigate('Message');
            }
        });
    }

    login() {
        let { form, Base } = this.props;

        form.validateFields((err, values) => {//todo 注意空格
            console.log('err', err, values);
            if (!err) {
                let captcha = values.captcha;
                if (captcha && this.state.captcha.toUpperCase().trim().replace(/\s/g, "") == captcha.toUpperCase()) {
                    Toast.loading('loading');
                    Base.login(values.username, values.password, this.registrationId);
                } else {
                    Toast.info('验证码错误');
                }
            }
            else {
                if (err.username) {
                    Toast.info('请输入用户名');
                }
                else if (err.password) {
                    Toast.info('请输入密码');
                }
                else if (err.captcha) {
                    Toast.info('请输入验证码');
                }
            }
        });
    }

    changeCaptcha = () => {

        let code = "";
        let codeLength = 4;
        //验证码的长度

        const codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //所有候选组成验证码的字符，当然也可以用中文的

        for (let i = 0; i < codeLength; i++) {
            let charNum = Math.floor(Math.random() * 52);
            code += (codeChars[charNum] + ' ');
        }

        this.setState({
            captcha: code,//toUpperCase
        })
    }

    checkSystemAddr = () => {
        this.props.navigation.navigate('SystemAddr');
        // this.props.navigation.navigate('CanlendarPage');
    }

    render() {
        const { form } = this.props;
        const { captcha } = this.state;
        const { getFieldProps } = form;
        return (
            <View style={styles.view}>

                <View style={styles.top}>
                    <Image source={require('../../resource/banner.png')}/>
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
                                               initialValue: "0017@ecsoft.com.hk",
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
                        <InputItem
                            extra={
                                <Button style={styles.captchaBtn}
                                        onPressIn={this.changeCaptcha}
                                        activeStyle={{ backgroundColor: '#6b518d' }}
                                >
                                    <Text style={{ color: '#333', fontSize: 18 }}>
                                        {captcha}
                                    </Text>
                                </Button>
                            }
                            placeholder="验证码"
                            {
                                ...getFieldProps(
                                    'captcha',
                                    {
                                        rules: [
                                            {
                                                required: true
                                            }
                                        ],
                                        initialValue: captcha.toUpperCase().trim().replace(/\s/g, "")
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

                <View style={styles.viewPwdWithLan}>

                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('ForgetPwd')}>
                        忘记密码
                    </Text>

                    <Text style={styles.text} onPress={this.checkSystemAddr}>
                        系统地址
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
    captcha: {
        backgroundColor: '#6b518d',
        width: 100,
        height: 40,
    },
    captchaTxt: {
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        color: '#333',
        fontSize: 16
    },
    captchaBtn: {
        backgroundColor: '#6b518d',
        borderColor: 'transparent',
        borderRadius: 3,
        width: 100,
        height: 40,
    },
});

export default createForm()(Index);

