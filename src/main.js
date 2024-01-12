import {createApp} from 'vue'
import App from './App.vue'
// import Vue from 'vue';


//导入路由
import router from './router/index'

//全局导入Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import * as Elicons from '@element-plus/icons-vue';

// Vue.config.productionTip = false;

// 不能设置为 true
axios.defaults.withCredentials = false;
// 定义代理服务器的主机名和端口
axios.defaults.proxy = {
      host: 'http://localhost', 
      port: 5000,
};

// object.keys(Elicons).forEach((key) => {
//       app.component(key, Elicons[key as keyof typeof Elicons]);
//     });    
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app')
