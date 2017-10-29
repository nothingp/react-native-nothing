import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';

import InputStyle from 'antd-mobile/lib/input-item/style/index';
import defaultVars from 'antd-mobile/lib/style/themes/default';

const InputItemStyle = {
    ...InputStyle,
    input: {
        flex: 1,
        height: defaultVars.list_item_height,
        backgroundColor: 'transparent',
        fontSize: defaultVars.input_font_size,
        color: '#666'
    },
    // container: {
    //     height: _default2['default'].list_item_height + _default2['default'].border_width_sm,
    //     borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    //     borderBottomColor: _default2['default'].border_color_base,
    //     marginLeft: _default2['default'].h_spacing_lg,
    //     paddingRight: _default2['default'].h_spacing_lg,
    //     marginTop: 0,
    //     marginBottom: 0,
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },
    // text: {
    //     marginRight: _default2['default'].h_spacing_sm,
    //     textAlignVertical: 'center',
    //     fontSize: _default2['default'].font_size_heading,
    //     color: _default2['default'].color_text_base
    // },
    // input: {
    //     flex: 1,
    //     height: _default2['default'].list_item_height,
    //     backgroundColor: 'transparent',
    //     fontSize: _default2['default'].input_font_size,
    //     color: _default2['default'].color_text_base
    // },
    // extra: {
    //     marginLeft: _default2['default'].h_spacing_sm,
    //     fontSize: _default2['default'].font_size_subhead,
    //     color: _default2['default'].color_text_caption
    // },
    // errorIcon: {
    //     marginLeft: _default2['default'].h_spacing_sm,
    //     width: _default2['default'].icon_size_sm,
    //     height: _default2['default'].icon_size_sm
    // }
}

export default class Index extends Component {
    render() {
        return (
            <InputItem {...this.props} styles={
                InputItemStyle
            }
            />
        )
    }
}

