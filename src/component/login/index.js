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

    constructor(props) {
        super(props);
        this.state = {
            captcha: '',
            captchaValue: '',
            captchaError: false,
            captchaErrorTxt: '',
        }
    }

    componentWillMount() {
        this.changeCaptcha();
    }

    onErrorClick = () => {
        let { captchaErrorTxt, captchaError } = this.state;
        if (captchaError) {
            Toast.info(captchaErrorTxt);
        }
    }

    onChange = (value) => {
        console.log('value', value);
        if (!value) {
            this.setState({
                captchaError: true,
                captchaErrorTxt: '请输入验证码',
            });
        } else {
            this.setState({
                captchaError: false,
                captchaErrorTxt: '',
            });
        }
        this.setState({
            captchaValue: value,
        });
    }

    login() {
        let { form, User } = this.props;
        let captcha = form.getFieldValue('captcha');

        if (!captcha || captcha && !captcha.trim()) {
            this.setState({
                captchaError: true,
                captchaErrorTxt: '请输入验证码',
            });
            return;
        }

        if (captcha && this.state.captcha.toUpperCase().trim().replace(/\s/g, "") == captcha.toUpperCase()) {
            form.validateFields(async (err, values) => {
                if (!err) {
                    Toast.loading('loading', 1);
                    await User.login(values.username, values.password);
                }
            });
        } else {
            console.log('log', captcha, this.state.captcha.toUpperCase().trim().replace(/\s/g, ""));
        }
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

    render() {
        if (this.props.User.userInfo) {
            Navigation.dismissModal({
                animationType: 'none'
            });
        }

        const { form, User, navigator } = this.props;
        const { captcha, captchaError, captchaErrorTxt, captchaValue } = this.state;
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
                        <InputItem
                            extra={
                                <View style={styles.captcha}>
                                    <Text style={styles.captchaTxt} onPress={this.changeCaptcha}>
                                        {captcha}
                                    </Text>
                                </View>
                            }
                            placeholder="验证码"
                            error={captchaError}
                            value={captchaValue}
                            onChange={this.onChange}
                            onErrorClick={this.onErrorClick}
                            {
                                ...getFieldProps(
                                    'captcha',
                                    {
                                        rules: [
                                            {
                                                required: true
                                            }
                                        ],
                                    }
                                )
                            }
                        >
                            <Icon type={'\ue6ea'}/>
                        </InputItem>
                    </List>
                </View>

                <WingBlank>
                    <Button  style={styles.button} type="primary" onPressIn={() => this.login()}>
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
});

export default createForm()(Index);

