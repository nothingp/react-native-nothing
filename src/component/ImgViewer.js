import React, { Component } from 'react';
import { Modal, ActivityIndicator, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import BaseComponent from './BaseComponent';
import { gColors } from '../common/GlobalContants';

export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            url: '',
            index: 0,
        };
    }

    show = (url, index) => {
        let urls = url ? url.toString().split(',') : [];
        let list = [];
        urls.map((v, i) => {
            let obj = {
                url: v,
            }
            list.push(obj);
        })
        this.setState({
            visible: true,
            url: list,
            index,
        })
    }

    render() {
        let { url, index } = this.state;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    this.setState({
                        visible: false,
                    })
                }}
            >
                <ImageViewer
                    loadingRender={
                        () => {
                            return (
                                <ActivityIndicator
                                    style={
                                        [
                                            styles.centering,
                                            { height: 80 }
                                        ]
                                    }
                                    size="large"
                                    color={gColors.brandPrimaryTap}
                                />
                            )
                        }
                    }
                    imageUrls={url}
                    onSave={() => {

                    }}
                    index={index}
                    saveToLocalByLongPress={false}
                    onClick={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});
