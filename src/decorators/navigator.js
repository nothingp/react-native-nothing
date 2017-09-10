import React, { Component } from 'react';
import {gColors} from '../common/GlobalContants'

export default navigator = ComposeComponent => class extends Component {
    static navigatorStyle = {
        navBarBackgroundColor:gColors.brandPrimary,
        navBarTextColor: '#fff'
    };

    render() {
        return (
            <ComposeComponent {...this.props} {...this.state} />
        );
    }
}