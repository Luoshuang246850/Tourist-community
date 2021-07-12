import axios from 'axios'

axios.defaults.withCredentials = true;//如果要用到session验证码功能，让请求携带cookie，可以加上
axios.defaults.timeout = 10000;//请求超时10秒
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';//设置post请求是的header信息

export default {

    //get请求
    requestGet(url,params = {}) {
        return new Promise((resolve,reject) =>{
            axios.get(url,params).then(res =>{
                resolve(res.data)
            }).catch(error =>{
                reject(error)
            })
        })
    },
    //post请求
    requestPost(url,params = {}) {
        return new Promise((resolve,reject) =>{
            axios.post(url,params).then(res =>{
                resolve(res.data)
            }).catch(error =>{
                reject(error)
            })
        })
    },
    //delete请求
    requestDelete(url,params = {}) {
        return new Promise((resolve,reject) =>{
            axios.delete(url,params).then(res =>{
                resolve(res.data)
            }).catch(error =>{
                reject(error)
            })
        })
    },
    //push请求
    requestPush(url,params = {}) {
        return new Promise((resolve,reject) =>{
            axios.put(url,params).then(res =>{
                resolve(res.data)
            }).catch(error =>{
                reject(error)
            })
        })
    },
}