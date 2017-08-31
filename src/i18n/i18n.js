import I18n from 'react-native-i18n';
import en from './locales/en';
import cn from './locales/zh-Hans-US';

I18n.fallbacks = true;

I18n.translations = {
    en,
    'zh-Hans-US':cn,
    'zh-Hans-CN':cn,
};


export default I18n;