// 封装ajax请求
import axios from 'axios'
export default function ajax(url, data={}, method='get') {
  return new Promise((resolve, reject) => {
    let promise
    if(method == 'get') {
        promise = axios.get(url, {
            params: data
        })
    }else {
        promise = axios.post(url, data)
    }
    promise.then(res => resolve(res.data)).catch((err) => {
           reject(err)

    })
  })
}