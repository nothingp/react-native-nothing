import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import BaseComponent from './BaseComponent';

export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            url: ''
        };
    }

    show = (url) => {
        this.setState({
            visible: true,
            url
        })
    }

    render() {
        let { url } = this.state;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    console.log('close');
                }}
            >
                <ImageViewer
                    imageUrls={[{ url }]}
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