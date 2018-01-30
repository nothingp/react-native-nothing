/**
 * 一些通用的共用组件
 **/
import React, {PureComponent} from 'react';
import {NoticeBar, Button} from 'antd-mobile';
import {
    View,
    StyleSheet,
    Text,
    PixelRatio,
    Image
} from 'react-native';

/**
 * 详细列表组件
 * @param props  name: 名字， text: 内容
 * @returns {XML}
 * @constructor
 */
export const Item = (props) => {
    const name = props.name?props.name:'';
    const text = props.text && props.text != null && props.text != 'null'?props.text:'';
    return(
        <View style={ItemStyles.listItem}>
            <View style={ItemStyles.titleWrap}>
                <Text style={ItemStyles.listTitle} numberOfLines={1}>
                    {name}
                </Text>
            </View>
            <View style={ItemStyles.listContent}>
                <Text style={ItemStyles.listText} numberOfLines={1}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const ItemStyles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 40,
        borderBottomWidth: 1/PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    titleWrap: {
        height: 40,
        justifyContent: 'center',
    },
    listContent: {
        height: 40,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    listTitle: {
        //fontSize: 14,
        marginRight: 10,
    },
    listText: {
        //fontSize: 14,
        color: '#9F9F9F',
    }
})

/**
 * 顶部审批状态信息
 * @param props
 * @returns {XML}
 * @constructor
 */
export const NoticeBarMessage = (props) => {
    return(
        <View>
            {
                props.status == 'N'?
                    <NoticeBar>
                        您的信息已提交成功，等待审批中。
                    </NoticeBar>:
                    props.status == 'P'?
                        <NoticeBar>
                            您的信息正在审批中。
                        </NoticeBar>:
                        props.status == 'R'?
                            <NoticeBar>
                                您的信息已审批不通过。
                            </NoticeBar>:
                            props.status == 'A'?
                                <NoticeBar>
                                    您的信息已审批通过。
                                </NoticeBar>:
                                null
            }
        </View>
    )
}

/**
 * 头部右边按钮
 * @param props text 按钮中显示的名字 fn调用的函数
 * @returns {XML}
 * @constructor
 */
export const RightButton = (props) => {
    return(
        <Button
            type="primary"
            style={rightButtonStyles.button}
            onPressIn={props.fn}
        >{props.text}</Button>
    )
}
const rightButtonStyles = StyleSheet.create({
    button: {
        //backgroundColor:'#3ba662',
        //borderColor: '#3ba662',
    }
});

export class SetTitle extends PureComponent{
    static navigationOptions = ({ navigation }) => ({
        title:'基本信息'
    });
    render() {
        return(
            <Text>
                111
            </Text>
        )
    }
}
/**
 * 必填*号
 * @returns {XML}
 * @constructor
 */
export const RequireData = (props) => {
    return(
        <Text>
            {
                props.require?
                    <Text style={requireStyle.text}>
                        *
                    </Text>:
                    null
            }
            {
                props.text?props.text:
                    this.children
            }
        </Text>
    )
}

const requireStyle = StyleSheet.create({
    text: {
        color: 'red',
    },
    brief: {
        fontSize: 14
    }
})

/**
 * 附件图片列表，最多4张图片
 * @param str用,分隔
 * @returns {XML}
 * @constructor
 */
export const ImgList = (str) => {
    const imgArr = str.split(',');
    const arr = Array.from(new Array(4 - imgArr.length));

    return(
        <View>
            <View style={{height: 40, display: 'flex', alignItems: 'center', flexDirection: 'row', backgroundColor: '#f2f2f2'}}>
                <Text style={{marginLeft: 15}}>
                    附件
                </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {
                    imgArr && imgArr.map((info, i) => {
                        return(
                            <View key={i} style={{flex: 1, width: 100, height: 70, marginTop: 10, marginBottom: 10}}>
                                <View style={{marginLeft: 5, marginRight: 5, position: 'relative'}}>
                                    <Image style={{width: '100%', height: '100%'}} source={{uri: info}}/>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    arr && arr.map((info, i) =>
                        <View key={i} style={{flex: 1}}>
                        </View>
                    )
                }
            </View>
        </View>
    )
}