import axios from 'axios';
import store from '@/store/index';

let reqCount = 0;
// 计数器累加
function addReqCount(){
  if(!reqCount){
    store.commit('changeIsLoading',true);
  }
  reqCount += 1;
}
// 计数器累减
function subtractReqCount(){
    reqCount--;
    if(!reqCount){
      store.commit('changeIsLoading',false);
    }
}

Object.assign(axios.defaults, {
    baseURL: '/api',
    timeout: 100000,
    headers: {
        authorization: store.state.huaqiaoInf.authorization || ''
    }
})

// 请求拦截器
axios.interceptors.request.use(config => {
    addReqCount();
    return config;
}, error => {
    subtractReqCount();
    return Promise.error(error);
})

// 响应拦截器
axios.interceptors.response.use(
    // 响应成功
    response => {
        subtractReqCount();
        if (response.status === 200) {
            return Promise.resolve(response);
        }
    },
    // 服务异常
    error => {
        subtractReqCount();
        return Promise.reject(error.response);
    }
)
export default axios;