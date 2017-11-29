import React, { PureComponent } from 'react';
import { autorun } from 'mobx';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import { inject, observer } from 'mobx-react/native';

@inject('User', 'True', "Base")
@observer
export default class Index extends PureComponent {

    render() {
        const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate('Daily');
                }}
            >
                <Text style={{ color: "#fff", fontSize: 18, paddingLeft: 15 }}>返回</Text>
            </TouchableOpacity>
        )
    }
}