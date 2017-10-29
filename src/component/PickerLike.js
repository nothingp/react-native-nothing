import React, { Component } from 'react';
import { Picker } from 'antd-mobile';

import PickerStyle from 'antd-mobile/lib/picker/style/index';
import defaultVars from 'antd-mobile/lib/style/themes/default';

const PickerItemStyle = {
    ...PickerStyle,
    actionText: {
        color: '#333',
        fontSize: 18,
        textAlign: 'center'
    },

    // modal: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'flex-end'
    // },
    // header: {
    //     flexGrow: 1,
    //     height: 44,
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#e7e7e7'
    // },
    // headerItem: {
    //     height: 44,
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // actionText: {
    //     color: '#0ae',
    //     fontSize: 18,
    //     textAlign: 'center'
    // },
    // title: {
    //     color: '#666',
    //     fontSize: 18,
    //     textAlign: 'center'
    // }
}

export default class Index extends Component {
    render() {
        return (
            <Picker {...this.props} styles={
                PickerItemStyle
            }
            />
        )
    }
}

