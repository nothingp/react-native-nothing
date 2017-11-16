import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    Button,
    Icon,
    Flex,
    Tabs,
    List,
    Toast,
} from 'antd-mobile';
import PDFView from 'react-native-pdf-view';
import HTMLView from 'react-native-htmlview';

import RNFS from 'react-native-fs';

const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';

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
        this.pdfView = null;
        this.state = {
            isPdfDownload: false,
        };
        this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
    }

    componentDidMount() {
        const { True } = this.props;
        const { pdfUrlData } = True;
        console.log('pdfUrlData_url', pdfUrlData && pdfUrlData.url);
        const url =
            // encodeURI(pdfUrlData.url);
        pdfDownloadURL;

        const options = {
            fromUrl: url,
            toFile: this.pdfPath
        };
        console.log('window', window);
        RNFS.downloadFile(options)
            .promise
            .then(res => {
                console.log('log-res', res);
                this.setState({ isPdfDownload: true }, () => {
                    Toast.hide();
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    zoom(val = 1) {
        this.pdfView &&
        this.pdfView.setNativeProps({
            zoom: val
        });
    }

    render() {
        if (!this.state.isPdfDownload) {
            return (
                <View style={styles.container}>
                    <Text>Downloading</Text>
                </View>
            );
        }
        return (
            <PDFView
                ref={(pdf) => {
                    this.pdfView = pdf;
                }}
                key="sop"
                path={this.pdfPath}
                onLoadComplete={(pageCount) => {
                    console.log(`total: ${pageCount}`);
                    this.zoom();
                }}
                style={styles.pdf}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pdf: {
        flex: 1
    }
});
