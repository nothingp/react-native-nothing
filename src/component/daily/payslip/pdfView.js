import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';

const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';

@inject('True')
@observer
export default class PDFExample extends Component {

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
        const options = {
            fromUrl: pdfUrlData.url || pdfDownloadURL,
            toFile: this.pdfPath
        };
        RNFS.downloadFile(options)
            .promise
            .then(res => {
                this.setState({
                    isPdfDownload: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    zoom(val = 2.1) {
        this.pdfView &&
        setTimeout(() => {
            this.pdfView.setNativeProps({
                zoom: val
            });
        }, 3000);
    }

    render() {
        let { True } = this.props;
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
                    console.log(`total page count: ${pageCount}`);
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
