export function format(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
    timestamp = parseInt(timestamp);

    if (!timestamp || typeof (timestamp) !== 'number') {
        console.warn('时间戳类型错误')
        return timestamp;
    }

    let millisecs = timestamp.toString().length == 10 ? (timestamp * 1000) : timestamp,
        time_obj = new Date(millisecs), //参数是 时间戳转换的毫秒
        o = {
            'M+': time_obj.getMonth() + 1, //月份
            'd+': time_obj.getDate(), //日
            'h+': time_obj.getHours(), //小时
            'm+': time_obj.getMinutes(), //分
            's+': time_obj.getSeconds(), //秒
            'q+': Math.floor((time_obj.getMonth() + 3) / 3), //季度
            'S': time_obj.getMilliseconds(), //毫秒
        };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (time_obj.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}

export default {}