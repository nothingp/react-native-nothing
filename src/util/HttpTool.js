import Base from '../stores/Base'

const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求超时'), timeout * 1000)
    })
}

const get = ({ url, params = {}, timeout }) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${url}?${paramArr.join('&')}`


    if (timeout === undefined) {
        return fetch(urlStr, {
            method: "GET",
            headers: {
                // "openId": "cff1e1863382ab8766dc7aff2d84fa51cf612d8fd038b82c303d1410d1a25055158d6d5988c434952fb44c30108bb567"
            },
            body: `${paramArr.join('&')}`
        }).then(res => {
            const result = res.json();
            console.log(url, params, result);
            return result
        });
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)]).then(res => {
            const result = res.json();
            console.log(url, params, result);
            return result
        });
    }
}

const post = ({ url, params = {}, timeout }) => {
    const paramArr = []

    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        }
    }

    console.log(`${Base.serverUrl}${url}`)

    if (timeout === undefined) {
        return fetch(`${Base.serverUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `${paramArr.join('&')}`
        }).then(res => {
            const result = res.json();
            console.log(url, params, result);
            return result
        });
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)]).then(res => {
            const result = res.json();
            console.log(url, params, result);
            return result
        });
    }
}

const postJson = ({ url, params = {} }) => {

    console.log('JSON', `${JSON.stringify(params)}`);

    console.log(`${Base.serverUrl}${url}`)

    return fetch(`${Base.serverUrl}${url}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8"
        },
        body: `${JSON.stringify(params)}`
    }).then(res => {
        const result = res.json();
        console.log(url, params, result);
        return result
    });
}

export { get, post, postJson }