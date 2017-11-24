import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    ListView,
    WebView,
    Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Flex, WhiteSpace, WingBlank, Icon, Grid, Button, List, Toast, Modal } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent'
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello S444tatic World</h1>
  </body>
</html>
`;

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        title: '消息详情'
    });

    componentWillUnmount() {
        const { User } = this.props;
        User.alertsList();
    }

    render() {
        let { create_time, title, url, description } = this.props.User.alertsDetailData;

        return (
            <View style={styles.container}>
                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
                                {title}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                                {create_time && format(create_time, 'yyyy-MM-dd')}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>
                <WebView
                    source={{ html: description }}
                    scalesPageToFit={true}
                />
            </View>
        )

        // return (
        //     <ScrollView style={{ backgroundColor: '#FFF' }}>
        //         <WhiteSpace size="lg"/>
        //
        //         <WingBlank size='lg'>
        //             <Flex>
        //                 <Flex.Item>
        //                     <Text style={{ fontSize: 18 }}>
        //                         {title}
        //                     </Text>
        //                 </Flex.Item>
        //             </Flex>
        //         </WingBlank>
        //
        //         <WhiteSpace size="lg"/>
        //
        //         <WingBlank size='lg'>
        //             <Flex>
        //                 <Flex.Item>
        //                     <Text style={{ fontSize: 18, color: '#666' }}>
        //                         {create_time && format(create_time, 'yyyy-MM-dd')}
        //                     </Text>
        //                 </Flex.Item>
        //             </Flex>
        //         </WingBlank>
        //
        //         <WhiteSpace size="lg"/>
        //         <WingBlank size='lg'>
        //             {/*<HTMLView value={description}/>*/}
        //         </WingBlank>
        //     </ScrollView>
        // )
    }
}

const styles = StyleSheet.create({
    brief: {
        height: 66,
        fontSize: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 20,
    },
});

