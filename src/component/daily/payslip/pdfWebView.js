import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import {
    StyleSheet,
    View,
    Text,
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

    render() {
        const { True } = this.props;
        const { pdfUrlData } = True;
        console.log('pdfUrlData_url', pdfUrlData && pdfUrlData.url);
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
