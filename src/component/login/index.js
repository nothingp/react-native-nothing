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
import Dialog from '../Dialog';
import ShowConfirm from '../ShowConfirm';
import { gColors } from '../../common/GlobalContants';
import Base from "../../stores/Base";

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
                if (this.props.Base.userInfo.is_manager == '1') {
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

        if(!Base.serverUrl){
            Toast.info('请先输入服务器地址');
            return;
        }

        form.validateFields((err, values) => {
            console.log('err', err, values);
            if (!err) {
                let captcha = values.captcha;
                if (captcha && this.state.captcha.toUpperCase().trim().replace(/\s/g, "") == captcha.toUpperCase()) {
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
    }

    render() {
        const { form,Base } = this.props;
        const { captcha } = this.state;
        const { getFieldProps } = form;
        const {username} = Base;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.bgImageWrapper}>
                    <Image source={require('../../resource/login/bg.png')} style={styles.bgImage}/>
                </View>
                <View>
                    <View style={styles.top}>
                        <Image
                            source={require('../../resource/login/logo.png')}
                            style={{
                                width: 100, height: 50,
                                resizeMode: "contain"
                            }}
                        />
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
                                                   //initialValue: "0022@ecsoft.com.hk",
                                                   initialValue:username
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
                                                   //initialValue: "1111111"
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
                                            //initialValue: captcha.toUpperCase().trim().replace(/\s/g, "")
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

                </View>

                <View style={styles.viewPwdWithLan}>
                    <Button
                        style={styles.btn}
                        activeStyle={styles.btn}
                        onPressIn={
                            () => {
                                this.props.navigation.navigate('ForgetPwd');
                            }
                        }
                    >
                        <Text style={styles.text}>忘记密码</Text>
                    </Button>

                    <Button
                        style={styles.btn}
                        activeStyle={styles.btn}
                        onPressIn={this.checkSystemAddr}
                    >
                        <Text style={styles.text}>系统地址</Text>
                    </Button>
                </View>

                <ShowConfirm ref="confirm"/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },
    top: {
        paddingTop: 80,
        paddingBottom: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor:'#17a164',
        borderRadius: 3,
        marginTop: 45,
        marginBottom: 20,
        borderColor: 'transparent'
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
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
    btn: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
    },
    captcha: {
        backgroundColor: '#6b518d',
        width: 100,
        height: 38,
    },
    captchaBtn: {
        backgroundColor: '#6b518d',
        borderColor: 'transparent',
        borderRadius: 3,
        width: 100,
        height: 38,
    },
});

export default createForm()(Index);

