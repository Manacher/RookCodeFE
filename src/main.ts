import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
import axios from "axios";
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

console.log('current env:', process.env.NODE_ENV);
console.log('current axios address', process.env.VUE_APP_SERVER);

// 配置axios默认请求地址
axios.defaults.baseURL = 'http://175.178.221.165:8081';

const AUTH_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDI2ODg3MzA2QHFxLmNvbSIsImNyZWF0ZWQiOjE2ODIyNDcwMTA0MDYsImV4cCI6MTcxODI0NzAxMH0.LmY3hcywCho3RVjPrfQkSx4ofSI-broMbfDU5eCXgVPctACsfEOA1n4NnYr64cquu9dx6Y9iVWPSUPlFSal6vA";
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios拦截器配置
axios.interceptors.request.use(function (config) {
    console.log("request param: ", config)
    return config;
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
    console.log("return response: ", response)
    return response;
}, error => {
    console.log("return error: ", error)
    return Promise.reject(error)
});

const app = createApp(App)
app.use(store).use(router).use(Antd).mount('#app')

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

// // 全局使用图标
const icons: any = Icons;
for(const i in icons){
    app.component(i, icons[i])
}
