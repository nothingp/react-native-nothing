import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { startTabsScreen } from '../../screens/index';
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
            value: '',
        }
    }

    hasError = false

    errorMsg = ''

    onSubmit() {
        this.props.form.validateFields((err, values) => {
            console.log('err', err);
            if (!err) {
                // Toast.loading('loading', 0);
                console.log('values', values);
                this.props.User.sendForgetPwdEmail(values.username);
            } else {
                this.hasError = true;
                this.errorMsg = '请输入您的用户名';
            }
        });
    }

    onErrorClick = () => {
        let { errorMsg, hasError } = this;
        if (hasError) {
            Toast.info(errorMsg);
        }
    }

    onChange = (value) => {
        if (!value) {
            this.hasError = true;
            this.errorMsg = '请输入您的用户名';
        } else {
            this.hasError = false;
            this.errorMsg = '';
        }
        this.setState({
            value,
        });
    }

    render() {
        const { form, User } = this.props;
        const { value } = this.state;
        const { getFieldProps } = form;
        this.errorMsg = User.sendForgetPwdEmailData && User.sendForgetPwdEmailData.resultdesc || '';
        this.hasError = User.sendForgetPwdEmailData && User.sendForgetPwdEmailData.result === 'ERR' || this.hasError;

        return (
            <View style={styles.view}>

                <List renderHeader={() => '请输入您的用户名来重置密码'}>
                    <InputItem
                        {
                            ...getFieldProps(
                                'username',
                                {
                                    rules: [
                                        {
                                            required: true
                                        },
                                    ],
                                }
                            )
                        }
                        placeholder="请输入您的用户名"
                        error={this.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={value}
                    />
                </List>

                <WingBlank>
                    <Button style={styles.button} type="primary" onPressIn={() => this.onSubmit()}>
                        提交
                    </Button>
                </WingBlank>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: '#f5f5f9',
    },
    top: {
        height: 170,
        backgroundColor: '#f5f5f9',

    },
    form: {
        backgroundColor: '#fff'
    },
    button: {
        height: 50,
        borderRadius: 3,
        marginTop: 45,
        marginBottom: 20,
        // backgroundColor: '#f5f5f9',
        backgroundColor: '#58cb8c',
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

