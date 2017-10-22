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
import { inject, observer } from 'mobx-react/native';
import { observable, action, runInAction, computed, autorun } from 'mobx';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '重置密码'
    });

    onSubmit() {
        const { User, form, navigation } = this.props;

        form.validateFields((err, values) => {
            console.log('err', err, values);
            if (!err) {
                Toast.loading('loading');
                User.sendForgetPwdEmail(values.username, navigation);
            } else {
                if (err.username) {
                    Toast.info('请输入用户名');
                }
            }
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldProps } = form;

        return (
            <View style={styles.view}>
                <WingBlank size='lg'>
                    <List renderHeader={() => '请输入用户名,来重置密码'}>
                        <InputItem
                            style={styles.setBorder}
                            {
                                ...getFieldProps(
                                    'username',
                                    {
                                        rules: [
                                            {
                                                required: true
                                            },
                                        ],
                                        initialValue: 'test@qq.com'
                                    }
                                )
                            }
                            placeholder="用户名"
                        />
                    </List>
                </WingBlank>

                <WingBlank size='lg'>
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
    button: {
        height: 50,
        borderRadius: 3,
        marginTop: 45,
        marginBottom: 20,
        backgroundColor: '#58cb8c',
        borderColor: 'transparent'
    },
    setBorder: {
        borderColor: '#ccc'
    }
});

export default createForm()(Index);

