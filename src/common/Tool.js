/**
 * 封装一些共用的函数
 */

/**
 * 时间格式化
 * @param timestamp  一般是时间戳
 * @param fmt 默认格式为 yyyy-MM-dd hh:mm:ss
 * @returns {*}
 */
export const format = (timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {//时间格式化
    if (!timestamp || typeof (timestamp) !== 'number') return timestamp;

    const millisecs = timestamp.toString().length == 10 ? (timestamp * 1000) : timestamp,
        time_obj = new Date(millisecs), //参数是 时间戳转换的毫秒
        o = {
            "M+": time_obj.getMonth() + 1,                 //月份
            "d+": time_obj.getDate(),                    //日
            "h+": time_obj.getHours(),                   //小时
            "m+": time_obj.getMinutes(),                 //分
            "s+": time_obj.getSeconds(),                 //秒
            "q+": Math.floor((time_obj.getMonth() + 3) / 3), //季度
            "S": time_obj.getMilliseconds()             //毫秒
        };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (time_obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}