import React, {PureComponent} from 'react';
import {InputItem} from 'antd-mobile';
import {View, PixelRatio} from 'react-native';

export default class Index extends PureComponent{
    render() {
        return (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: 110, marginLeft: 15, height: '100%', borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: '#DCDDDC'}}>
                    {
                        this.props.children?
                            this.props.children:
                            null
                    }
                </View>
                <View style={{flex: 1, marginLeft: -15}}>
                    <InputItem
                        {
                         ...this.props
                        }
                        children = {null}
                    />
                </View>
            </View>
        )
    }
}