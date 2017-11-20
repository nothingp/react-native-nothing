import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import {
    StyleSheet,
    View,
    Text,
    Platform,
    Linking,
    WebView
} from 'react-native';
import {
    Button,
    Icon,
    Flex,
    Tabs,
    List,
    Toast,
} from 'antd-mobile';

@inject('True')
@observer
export default class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (Platform.OS == 'android') {
            const { True } = this.props;
            const { pdfUrlData } = True;
            Linking.canOpenURL(pdfUrlData.url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(pdfUrlData.url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
    }

    render() {
        if (Platform.OS == 'android') {
            return null;
        }
        const { True } = this.props;
        const { pdfUrlData } = True;
        const url = encodeURI(pdfUrlData.url);
        return (
            <WebView source={{ uri: url }}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
