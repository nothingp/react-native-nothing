import React, { Component } from 'react';
import { TextareaItem } from 'antd-mobile';

import TextAreaStyle from 'antd-mobile/lib/textarea-item/style/index';
import defaultVars from 'antd-mobile/lib/style/themes/default';

const TextAreaItemStyle = {
    ...TextAreaStyle,
    container: {
        marginLeft: 6,
        borderBottomWidth: defaultVars.border_width_sm,
        borderBottomColor: defaultVars.border_color_base
    },
    input: {
        paddingHorizontal: defaultVars.h_spacing_md,
        backgroundColor: defaultVars.fill_base,
        fontSize: 14,
        lineHeight: Math.round(1.3 * defaultVars.font_size_heading),
        textAlignVertical: 'top',
    },

    // container: {
    //     marginLeft: _default2['default'].h_spacing_lg,
    //     borderBottomWidth: _default2['default'].border_width_sm,
    //     borderBottomColor: _default2['default'].border_color_base
    // },
    // input: {
    //     paddingHorizontal: _default2['default'].h_spacing_md,
    //     backgroundColor: _default2['default'].fill_base,
    //     fontSize: _default2['default'].font_size_heading,
    //     lineHeight: Math.round(1.3 * _default2['default'].font_size_heading),
    //     textAlignVertical: 'top'
    // },
    // icon: {
    //     position: 'absolute',
    //     top: 8,
    //     width: _default2['default'].icon_size_xs,
    //     height: _default2['default'].icon_size_xs
    // },
    // errorIcon: {
    //     position: 'absolute',
    //     right: 18,
    //     top: 12
    // },
    // count: {
    //     position: 'absolute',
    //     right: _default2['default'].h_spacing_md,
    //     bottom: _default2['default'].h_spacing_md
    // }
}

export default class Index extends Component {
    render() {
        return (
            <TextareaItem {...this.props} styles={
                TextAreaItemStyle
            }
            />
        )
    }
}

