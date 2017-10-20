/**
 * 一些通用的共用组件
 **/
import React, {PureComponent} from 'react';
import {NoticeBar, Button} from 'antd-mobile';
import {
    View,
    StyleSheet,
    Text,
    PixelRatio
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
        height: 50,
        borderBottomWidth: 1/PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    titleWrap: {
        height: 50,
        justifyContent: 'center',
    },
    listContent: {
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    listTitle: {
        fontSize: 15,
        marginRight: 10,
    },
    listText: {
        fontSize: 14,
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
        backgroundColor:'#3ba662',
        borderColor: '#3ba662',
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
export const RequireData = () => {
    return(
        <Text style={requireStyle.text}>
            *
        </Text>
    )
}

const requireStyle = StyleSheet.create({
    text: {
        color: 'red',
    }
})