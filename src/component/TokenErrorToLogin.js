import React, { PropTypes } from 'react';
import { Grid, WhiteSpace, Icon, Toast, List } from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import { NavigationActions } from 'react-navigation';

import BaseComponent from './BaseComponent';

/**
 * 检查如果令牌错误，则到login
 */
@inject('Base')
@observer
class TokenErrorToLoginComp extends BaseComponent {

    componentWillMount() {
        const { Base, navigation } = this.props;
        if (!Base.userInfo) {
            Toast.fail(
                '异常登录，请重新登录',
                1,
                () => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login' })
                        ]
                    })
                    navigation.dispatch(resetAction);
                }
            );
        }
    }

    render() {
        return (
            this.props.children
        );
    }
}

const TokenErrorToLogin = WrappedComponent => class extends React.Component {
    render() {
        return (
            <TokenErrorToLoginComp {...this.props}>
                <WrappedComponent {...this.props} {...this.state}/>
            </TokenErrorToLoginComp>
        )
    }
}

export default TokenErrorToLogin;