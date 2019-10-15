import axios  from "axios"
import {Toast} from 'antd-mobile'
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    console.log('error',info)
    //if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
    constructor (baseUrl) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
           // timeout:30000,
            headers: {
                //
            }
        }
        return config
    }
    destroy (url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const { data, status } = res
            return { data, status }
        }, error => {
            this.destroy(url)
            let errorInfo = error.response
            if (!errorInfo) {
                //const { request: { statusText, status}, config } = JSON.parse(JSON.stringify(error))
                const {...config } = JSON.parse(JSON.stringify(error))
                /*if(config.message=='timeout of 30000ms exceeded'){
                    Toast.hide()
                    Toast.fail('网络连接超时',1)

                }*/
                errorInfo = {
                    statusText:config.message,
                    status:400,
                    request: { responseURL: config.url }
                }
            }
            addErrorLog(errorInfo)
            return Promise.reject(error)
        })
    }
    request (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
