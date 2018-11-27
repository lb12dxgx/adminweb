import Axios from 'axios';
import router from '../router';
import axiosMock from 'axios-mock-adapter'
const mockAxios = Axios.create();
const mock = new axiosMock(mockAxios);
const uuidv4 = require('uuid/v4');
//const ip="http://127.0.0.1"
const ip="http://120.79.20.2"
mock.restore();//去掉模拟行为
export  {mock,mockAxios,router,uuidv4,ip}